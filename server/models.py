#!/usr/bin/env python3

from datetime import datetime, timezone

from config import bcrypt, db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
