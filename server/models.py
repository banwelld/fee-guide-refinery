#!/usr/bin/env python3

import datetime
import re

import bcrypt
from config import db
from services.utils.enums import ProvinceCode, Specialty
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin


class FeeGuide(db.Model, SerializerMixin):
    __tablename__ = "fee_guides"

    id = db.Column(db.Integer, primary_key=True)
    province_code = db.Column(db.Enum(ProvinceCode), nullable=False)
    specialty_code = db.Column(db.Enum(Specialty), nullable=False)
    year_effective = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    client = db.relationship("Client", back_populates="fee_guide")
    fee_guide_entries = db.relationship(
        "FeeGuideEntry", back_populates="fee_guide", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<< FeeGuide: {self.year_effective} -- {self.province_code} -- {self.specialty_code} >>"

    @validates("year_effective")
    def validate_year(self, key, year_effective):
        max_allowed_year = datetime.date.today().year + 1
        if int(year_effective) > max_allowed_year:
            raise ValueError(f"{year_effective} fee guides are not yet available.")
        return year_effective


class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    entry_type = db.Column(db.String, nullable=True)
    parent_category = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    order_entries = db.relationship(
        "FeeGuideEntry", back_populates="entry", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<< ENTRY: {self.id} -- {self.entry_type} -- {self.name} >>"

    @validates("name", "entry_type")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key.replace('_', ' ')} cannot be empty")
        return value.strip()


class FeeGuideEntry(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    fee_min_cents = db.Column(db.Integer, nullable=False, default=0)
    fee_max_cents = db.Column(db.Integer, nullable=False, default=0)
    fee_strategy = db.Column(db.String, nullable=False, default="STANDARD")
    has_L_flag = db.Column(db.Boolean, nullable=True, default=False)
    has_E_flag = db.Column(db.Boolean, nullable=True, default=False)
    has_PS_flag = db.Column(db.Boolean, nullable=True, default=False)
    fee_guide_id = db.Column(db.Integer, db.ForeignKey("fee_guides.id"), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey("entries.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    fee_guide = db.relationship("FeeGuide", back_populates="fee_guide_entries")
    entry = db.relationship("Entry", back_populates="order_entries", lazy="joined")

    def __repr__(self):
        return f"<< FeeGuideEntry: entry={self.entry_id} -- {self.fee_strategy} -- min={self.fee_min_cents} >>"


class Client(db.Model, SerializerMixin):
    __tablename__ = "clients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    telephone = db.Column(db.String, nullable=False)
    concurrent_logins = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f"<< ENTRY: {self.name} >>"

    @validates("name", "telephone")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key.replace('_', ' ')} cannot be empty")
        return value.strip()


class User(db.Model, SerializerMixin):
    __tablename__ = "fee_guide_entries"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.string, nullable=False, default=0)
    email = db.Column(db.String, nullable=False)
    role = db.Column(db.string, nullable=False, default=0)
    _password_hash = db.Column(db.String, nullable=False, default="STANDARD")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

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
            raise ValueError("Invalid email address format")
        return address

    @validates("role")
    def validate_role(self, key, role):
        if role not in ["level_1", "level_2", "level_3"]:
            raise ValueError("Invalid user role")
        return role

    def __repr__(self):
        return f"<< FeeGuideEntry: entry={self.username} -- {self.email} -- min={self.role} >>"
