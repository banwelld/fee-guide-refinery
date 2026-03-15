#!/usr/bin/env python3

import os
from datetime import datetime, timezone

from config import api, app, bcrypt, db
from flask import (
    g,
    jsonify,
    make_response,
    request,
    send_from_directory,
    session,
)
from flask_restful import Resource
from helpers import make_error, make_message
from models import Account, FeeGuide, FeeGuideItem, ScheduleItem, User
from namespace import Message as Msg

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


# superclass to give all members the get-all functionality
class GetAllResource(Resource):
    model = None

    def get(self):
        item_list = [i.to_dict() for i in self.model.query.all()]
        return make_response(item_list, 200)


# superclass to give all members the get-by-id functionality
class GetByIDResource(Resource):
    model = None

    def get(self, id):
        item = db.session.get(self.model, id)
        if not item:
            return make_response({"error": "not found"}, 404)
        return make_response(item.to_dict(), 200)


class AllScheduleItems(GetAllResource):
    model = ScheduleItem


api.add_resource(AllScheduleItems, "/schedule-items")


class AllFeeGuides(Resource):
    def get(self):
        if not g.user_id:
            return make_error(Msg.NOT_AUTHENTICATED, 401)
        if not g.user:
            return make_error(Msg.UNAUTHORIZED, 403)

        fee_guides = FeeGuide.query.filter(FeeGuide.account_id == g.account_id).all()

        return make_response([fg.to_dict() for fg in fee_guides], 200)


api.add_resource(AllFeeGuides, "/fee-guides")


class AllFeeGuideItems(GetAllResource):
    model = FeeGuideItem


api.add_resource(AllFeeGuideItems, "/fee-guide-items")


class AllAccounts(GetAllResource):
    model = Account


api.add_resource(AllAccounts, "/accounts")


class AllUsers(GetAllResource):
    model = User


api.add_resource(AllUsers, "/users")


class ScheduleItemsByID(GetByIDResource):
    model = ScheduleItem


api.add_resource(ScheduleItemsByID, "/schedule-items/<int:id>")


class FeeGuidesByID(GetByIDResource):
    model = FeeGuide


api.add_resource(FeeGuidesByID, "/fee-guides/<int:id>")


class FeeGuideItemsByID(GetByIDResource):
    model = FeeGuideItem


api.add_resource(FeeGuideItemsByID, "/fee-guide-items/<int:id>")


class AccountsByID(GetByIDResource):
    model = Account


api.add_resource(AccountsByID, "/accounts/<int:id>")


class UsersByID(GetByIDResource):
    model = User


api.add_resource(UsersByID, "/users/<int:id>")


class Session(Resource):
    def get(self):
        if not g.user:
            return make_response(jsonify(None), 200)
        return make_response(g.user.to_dict(), 200)


api.add_resource(Session, "/session")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
