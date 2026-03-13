import os

from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# open env files
env_path = os.path.join(os.path.dirname(__file__), "settings.env")
load_dotenv(dotenv_path=env_path)

# Instantiate app, set attributes

raw_url = (
    os.getenv("REMOTE_DB_URL") or os.getenv("LOCAL_DB_URL") or os.getenv("DATABASE_URL")
)
if raw_url and raw_url.startswith("postgres://"):
    DB_URL = raw_url.replace("postgres://", "postgresql://", 1)
else:
    DB_URL = raw_url

SECRET_KEY = os.getenv("APP_SECRET_KEY")

app = Flask(
    __name__,
    static_folder=os.path.abspath("../client/build"),
    static_url_path="",
)
app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
app.secret_key = SECRET_KEY or os.urandom(32)

# Define metadata, instantiate db

metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app, prefix="/api")
bcrypt = Bcrypt(app)
