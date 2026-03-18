#!/usr/bin/env python3

import json
import os

from config import app, db
from models import Account, FeeGuideItem, ScheduleItem, User
from sqlalchemy import text

CDA_JSON_PATH = os.path.join(
    os.path.dirname(__file__), "data", "test", "CDA_master.json"
)

# ---------------------------------------------------------------------------
# Account data
# ---------------------------------------------------------------------------
ACCOUNTS = [
    {
        "name": "Mapleleaf Benefits Group",
        "telephone": "(416) 555-0182",
    },
    {
        "name": "Rideau Mutual Insurance",
        "telephone": "(416) 555-0247",
    },
]

# ---------------------------------------------------------------------------
# User data  (3 per account, roles: manager / business_user / data_admin)
# ---------------------------------------------------------------------------
USERS_TEMPLATE = [
    {
        "username": "manager_{suffix}",
        "email": "manager_{suffix}@{domain}",
        "role": "manager",
        "password": "Password1!",
    },
    {
        "username": "bizuser_{suffix}",
        "email": "bizuser_{suffix}@{domain}",
        "role": "business_user",
        "password": "Password1!",
    },
    {
        "username": "dataadmin_{suffix}",
        "email": "dataadmin_{suffix}@{domain}",
        "role": "data_admin",
        "password": "Password1!",
    },
]

ACCOUNT_META = [
    {"suffix": "mlbg", "domain": "maplegroup.ca"},
    {"suffix": "rmi", "domain": "rideaumutual.ca"},
]


def seed_accounts():
    accounts = []
    for data in ACCOUNTS:
        account = Account(name=data["name"], telephone=data["telephone"])
        db.session.add(account)
        accounts.append(account)
    db.session.flush()  # get IDs without committing
    return accounts


def seed_users(accounts):
    for account, meta in zip(accounts, ACCOUNT_META):
        for template in USERS_TEMPLATE:
            user = User(
                username=template["username"].format(**meta),
                email=template["email"].format(**meta),
                role=template["role"],
                account_id=account.id,
            )
            user.password = template["password"]
            db.session.add(user)


def seed_schedule_items():
    with open(CDA_JSON_PATH, "r") as f:
        procedures = json.load(f)

    for proc in procedures:
        item = ScheduleItem(
            name=proc["name_long"],
            code=proc["code"],
            parent_category=proc.get("category"),
            is_master=True,
        )
        db.session.add(item)

    print(f"  Seeded {len(procedures)} ScheduleItems.")


def run():
    with app.app_context():
        print("Dropping schema (CASCADE)...")
        with db.engine.connect() as conn:
            conn.execute(text("DROP SCHEMA public CASCADE"))
            conn.execute(text("CREATE SCHEMA public"))
            conn.commit()

        print("Recreating all tables...")
        db.create_all()

        print("Seeding Accounts...")
        accounts = seed_accounts()

        print("Seeding Users...")
        seed_users(accounts)

        print("Seeding ScheduleItems...")
        seed_schedule_items()

        db.session.commit()
        print("Done! ✅")


if __name__ == "__main__":
    run()
