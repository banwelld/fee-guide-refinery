#!/usr/bin/env python3

import base64
from datetime import datetime, timezone
from io import BytesIO

from config import api, app, bcrypt, db
from flask import (
    g,
    jsonify,
    make_response,
    request,
    session,
)
from flask_restful import Resource
from helpers import find_falsey, find_req_fields, make_error, make_message
from models import Account, FeeGuide, FeeGuideItem, ScheduleItem, User
from namespace import Message as Msg
from services.fee_guide_builder import build_fee_guide
from services.load_data import load_procedures_into_db
from services.utils.config import FEE_GUIDE_CONFIG
from services.utils.enums import ProvinceCode, Specialty
from werkzeug.datastructures import FileStorage

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")


@app.before_request
def load_user():
    g.user_id = session.get("user_id")
    g.user = db.session.get(User, g.user_id) if g.user_id else None
    g.account_id = g.user.account_id if g.user else None


@app.errorhandler(ValueError)
def handle_value_error(e):
    return make_response(jsonify({"error": str(e)}), 422)





class AllFeeGuides(Resource):
    def get(self):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        fee_guides = FeeGuide.query.filter(FeeGuide.account_id == g.account_id).all()

        return make_response([fg.to_dict() for fg in fee_guides], 200)

    def post(self):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        data = request.json or {}
        province_code = data.get("province_code")
        specialty_code = data.get("specialty_code")
        year_str = str(data.get("year_effective", ""))

        if falsey := find_falsey(
            {
                "province_code": province_code,
                "specialty_code": specialty_code,
                "year_effective": year_str,
            }
        ):
            return make_error(Msg.MISSING_FIELDS, 422, fields=falsey)

        pdf_b64 = data.get("fee_guide_document")
        if not pdf_b64:
            return make_error(Msg.NO_FILE, 400, file_name="fee_guide_document")

        if "base64," in pdf_b64:
            pdf_b64 = pdf_b64.split("base64,")[1]

        try:
            pdf_bytes = base64.b64decode(pdf_b64)
            pdf_file = FileStorage(
                stream=BytesIO(pdf_bytes),
                filename="upload.pdf",
                content_type="application/pdf",
            )
        except Exception:
            return make_error(Msg.NO_FILE, 400, file_name="fee_guide_document")

        try:
            prov_enum = ProvinceCode[province_code.upper()]
            spec_enum = Specialty[specialty_code.upper()]
        except KeyError:
            return make_error(Msg.INVALID_CODE, 422, code_type="province or specialty")

        try:
            config = FEE_GUIDE_CONFIG[prov_enum.value][spec_enum.value][year_str]
        except KeyError:
            return make_error(
                Msg.NO_CONFIG,
                422,
                province=province_code,
                specialty=specialty_code,
                year=year_str,
            )

        try:
            procedures = build_fee_guide(
                pdf_source=pdf_file,
                config=config,
                province=prov_enum.value,
                specialty=spec_enum.value,
                year=year_str,
            )
        except Exception as e:
            return make_error(Msg.PDF_EXTRACT_FAIL, 422, error=str(e))

        try:
            existing_guide = FeeGuide.query.filter_by(
                province_code=prov_enum.value,
                specialty_code=spec_enum.value,
                year_effective=year_str,
                account_id=g.account_id,
            ).first()

            if existing_guide:
                return make_error(Msg.GUIDE_EXISTS, 409)

            fee_guide = FeeGuide(
                province_code=prov_enum.value,
                specialty_code=spec_enum.value,
                year_effective=year_str,
                account_id=g.account_id,
            )
            db.session.add(fee_guide)
            db.session.flush()

            fee_guide = load_procedures_into_db(
                fee_guide=fee_guide,
                procedures=procedures,
                user_id=g.user_id,
            )
        except Exception as e:
            db.session.rollback()
            return make_error(Msg.DB_LOAD_FAIL, 422, error=str(e))

        return make_response(fee_guide.to_dict(), 201)


api.add_resource(AllFeeGuides, "/fee-guides")




class AllUsers(Resource):
    def post(self):
        if g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        data = request.json or {}
        required_fields = find_req_fields(User)
        if falsey := find_falsey({k: data.get(k) for k in required_fields}):
            return make_error(Msg.MISSING_FIELDS, 422, fields=falsey)

        if User.query.filter_by(email=data.get("email")).first():
            return make_error(Msg.EMAIL_TAKEN, 422)

        try:
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()

            if request.args.get("action_type") == "register":
                session["user_id"] = new_user.id

            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 422)


api.add_resource(AllUsers, "/users")




class FeeGuidesByID(Resource):
    def get(self, id):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        item = db.session.get(FeeGuide, id)
        if not item:
            return make_response({"error": "not found"}, 404)
        return make_response(item.to_dict(), 200)

    def delete(self, id):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        fee_guide = db.session.get(FeeGuide, id)
        if not fee_guide:
            return make_response({"error": "not found"}, 404)

        is_admin = g.user.role == "data_admin"
        is_manager = g.user.role == "manager"

        if not (is_admin or (is_manager and fee_guide.account_id == g.account_id)):
            return make_error(Msg.UNAUTHORIZED, 403)

        try:
            db.session.delete(fee_guide)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 422)


api.add_resource(FeeGuidesByID, "/fee-guides/<int:id>")


class FeeGuideItemsByID(Resource):
    def patch(self, id):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        fee_guide_item = db.session.get(FeeGuideItem, id)
        if not fee_guide_item:
            return make_response({"error": "not found"}, 404)

        is_admin = g.user.role == "data_admin"
        is_manager = g.user.role == "manager"

        if not (
            is_admin
            or (is_manager and fee_guide_item.fee_guide.account_id == g.account_id)
        ):
            return make_error(Msg.UNAUTHORIZED, 403)

        data = request.json or {}

        for field in [
            "fee_min_cents",
            "fee_max_cents",
            "fee_strategy",
            "has_L_flag",
            "has_E_flag",
            "has_PS_flag",
        ]:
            if field in data:
                setattr(fee_guide_item, field, data[field])

        fee_guide_item.updated_by = g.user_id

        try:
            db.session.commit()
            return make_response(fee_guide_item.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 422)

    def delete(self, id):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        fee_guide_item = db.session.get(FeeGuideItem, id)
        if not fee_guide_item:
            return make_response({"error": "not found"}, 404)

        is_admin = g.user.role == "data_admin"
        is_manager = g.user.role == "manager"

        if not (
            is_admin
            or (is_manager and fee_guide_item.fee_guide.account_id == g.account_id)
        ):
            return make_error(Msg.UNAUTHORIZED, 403)

        try:
            db.session.delete(fee_guide_item)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 422)


api.add_resource(FeeGuideItemsByID, "/fee-guide-items/<int:id>")




class Session(Resource):
    def get(self):
        if not g.user:
            return make_response(jsonify(None), 200)
        return make_response(g.user.to_dict(), 200)

    def post(self):
        data = request.json or {}
        if not data:
            return make_error(Msg.NO_DATA, 400)

        required = ["email", "password"]
        if falsey := find_falsey({k: data.get(k) for k in required}):
            return make_error(Msg.MISSING_FIELDS, 422, fields=falsey)

        user = User.query.filter(User.email == data.get("email")).first()
        if not user:
            # timing attack mitigation
            bcrypt.check_password_hash(DUMMY_HASH, data.get("password"))
            return make_error(Msg.INVALID_CREDS, 401)

        if not user.authenticate(data.get("password")):
            return make_error(Msg.INVALID_CREDS, 401)

        session["user_id"] = user.id
        return make_response(user.to_dict(), 200)

    def delete(self):
        session.clear()
        return make_message(Msg.LOGGED_OUT)


api.add_resource(Session, "/session")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
