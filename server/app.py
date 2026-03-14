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
from models import Client, FeeGuide, FeeGuideItem, Procedure, User

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")


class AllScheduleItems(Resource):
    def get(self):
        procedures = [e.to_dict() for e in Procedure.query.all()]
        return make_response(procedures, 200)


api.add_resource(AllScheduleItems, "/schedule-items")


class AllFeeGuides(Resource):
    pass


api.add_resource(AllFeeGuides, "/fee-guides")


class AllFeeGuideItems(Resource):
    pass


api.add_resource(AllFeeGuideItems, "/fee-guide-items")


class AllClients(Resource):
    pass


api.add_resource(AllClients, "/clients")


class AllUsers(Resource):
    pass


api.add_resource(AllUsers, "/users")


class ScheduleItemsByID(Resource):
    pass


api.add_resource(ScheduleItemsByID, "/schedule-items")


class FeeGuidesByID(Resource):
    pass


api.add_resource(FeeGuidesByID, "/fee-guides")


class FeeGuideItemsByID(Resource):
    pass


api.add_resource(FeeGuideItemsByID, "/fee-guide-items")


class ClientsByID(Resource):
    pass


api.add_resource(ClientsByID, "/clients")


class UsersByID(Resource):
    pass


api.add_resource(UsersByID, "/users")
