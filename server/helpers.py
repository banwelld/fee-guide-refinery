from flask import make_response
from namespace import Message as Msg
from sqlalchemy import inspect


def find_req_fields(model):
    """
    find fields that are non-nullable and that are also not any of: primary key,
    default, server_default.
    """
    mapper = inspect(model)
    required = [
        "password" if column.name == "_password_hash" else column.name
        for column in mapper.columns
        if (
            not column.nullable
            and not column.primary_key
            and column.default is None
            and column.server_default is None
        )
    ]
    return required


def find_falsey(data_dict):
    """
    find keys that have falsey values.
    """
    falsey_keys = [k for k, v in data_dict.items() if not v]
    return (", ").join(falsey_keys)


def make_error(message_key: Msg, status=400, **kwargs):
    if not isinstance(message_key, Msg):
        raise ValueError(f"Message Key '{message_key}' not found in Messages")

    message_text = message_key(**kwargs)

    return make_response({"error": message_text}, status)


def make_message(message_key: Msg, status=200):
    if not isinstance(message_key, Msg):
        raise ValueError(f"Message Key '{message_key}' not found in Messages")

    return make_response({"message": message_key.value}, status)
