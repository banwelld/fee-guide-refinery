#!/usr/bin/env python3

import datetime
import re

from config import bcrypt, db
from namespace import Message as Msg
from services.utils.enums import ProvinceCode, Specialty
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin


class FeeGuide(db.Model, SerializerMixin):
    __tablename__ = "fee_guides"
    serialize_rules = ("-account.fee_guides", "-fee_guide_items.fee_guide")
    serialize_types = (
        (ProvinceCode, lambda x: x.name),
        (Specialty, lambda x: x.name),
    )

    id = db.Column(db.Integer, primary_key=True)
    province_code = db.Column(db.Enum(ProvinceCode), nullable=False)
    specialty_code = db.Column(db.Enum(Specialty), nullable=False)
    year_effective = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"), nullable=False)
    account = db.relationship("Account", back_populates="fee_guides")
    fee_guide_items = db.relationship(
        "FeeGuideItem", back_populates="fee_guide", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<< FEE_GUIDE: {self.year_effective} {self.province_code} {self.specialty_code} >>"

    @validates("year_effective")
    def validate_year(self, key, year_effective):
        max_allowed_year = datetime.date.today().year + 1
        if int(year_effective) > max_allowed_year:
            raise ValueError(Msg.UNAVAILABLE(year=year_effective))
        return year_effective


class ScheduleItem(db.Model, SerializerMixin):
    __tablename__ = "schedule_items"
    serialize_rules = ("-fee_guide_items.schedule_item",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    code = db.Column(db.String, nullable=False)
    parent_category = db.Column(db.String, nullable=True)
    is_master = db.Column(db.Boolean, default=False)
    provinces = db.Column(db.String, default="")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    fee_guide_items = db.relationship(
        "FeeGuideItem", back_populates="schedule_item", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<< ITEM: {self.item_type} -- {self.name} >>"

    @validates("name", "item_type")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(Msg.NO_EMPTY(item=key.replace("_", " ")))
        return value.strip()


class FeeGuideItem(db.Model, SerializerMixin):
    __tablename__ = "fee_guide_items"
    serialize_rules = ("-fee_guide.fee_guide_items", "-schedule_item.fee_guide_items")

    id = db.Column(db.Integer, primary_key=True)
    fee_min_cents = db.Column(db.Integer, nullable=False, default=0)
    fee_max_cents = db.Column(db.Integer, nullable=False, default=0)
    fee_strategy = db.Column(db.String, nullable=False, default="UNKNOWN_STRATEGY")
    has_L_flag = db.Column(db.Boolean, nullable=True, default=False)
    has_E_flag = db.Column(db.Boolean, nullable=True, default=False)
    has_PS_flag = db.Column(db.Boolean, nullable=True, default=False)
    is_province_specific = db.Column(db.Boolean, default=False)
    fee_guide_id = db.Column(db.Integer, db.ForeignKey("fee_guides.id"), nullable=False)
    schedule_item_id = db.Column(
        db.Integer, db.ForeignKey("schedule_items.id"), nullable=False
    )
    parent_category = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer, nullable=False)
    fee_guide = db.relationship("FeeGuide", back_populates="fee_guide_items")
    schedule_item = db.relationship("ScheduleItem", back_populates="fee_guide_items")

    def __repr__(self):
        return f"<< ITEM: id={self.id} {self.fee_guide.province_code} {self.fee_guide.year_effective}>>"


class Account(db.Model, SerializerMixin):
    __tablename__ = "accounts"
    serialize_rules = ("-fee_guides.account", "-users.account")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    telephone = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    fee_guides = db.relationship(
        "FeeGuide", back_populates="account", cascade="all, delete-orphan"
    )
    users = db.relationship(
        "User", back_populates="account", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<< ACCOUNT: {self.name} >>"

    @validates("name", "telephone")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(Msg.NO_EMPTY(item=key.replace("_", " ")))
        return value.strip()


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = ("-account.users", "-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False, default="business_user")
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"), nullable=False)
    account = db.relationship("Account", back_populates="users")

    @hybrid_property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, password):
        password = bcrypt.generate_password_hash(password)
        self._password_hash = password.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates("email")
    def validate_email(self, key, address):
        if not address or not re.match(r"[^@]+@[^@]+\.[^@]+", address):
            raise ValueError(Msg.EMAIL_INVALID)
        return address

    @validates("role")
    def validate_role(self, key, role):
        valid_roles = ["manager", "business_user", "data_admin"]
        if role not in valid_roles:
            raise ValueError(Msg.ROLE_INVALID)
        return role

    def __repr__(self):
        return f"<< User: {self.username} -- {self.email} -- {self.role} >>"
