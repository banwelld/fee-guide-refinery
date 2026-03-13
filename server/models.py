#!/usr/bin/env python3

import datetime

from config import bcrypt, db
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

    def __repr__(self):
        return f"<< FeeGuide: {self.year_effective} -- {self.province_code} -- {self.specialty_code} >>"

    @validates("year_effective")
    def validate_status(self, key, year_effective):
        max_allowed_year = datetime.date.today().year + 1
        if int(self.year_effective) > max_allowed_year:
            raise ValueError(f"{year_effective.year} fee guides are not yet available.")
        return self


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
        return f"<< ENTRY: {self.id} -- {self.category} -- {}) >>"

    @validates("name", "entry_type")
    def validate_strings(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key.replace('_', ' ')} cannot be empty")
        return value.strip()
