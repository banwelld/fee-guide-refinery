from flask import make_response
from namespace import Message as Msg


def make_error(message_key: Msg, status=400, **kwargs):
    if not isinstance(message_key, Msg):
        raise ValueError(f"Message Key '{message_key}' not found in Messages")

    message_text = Msg.message_key(**kwargs) if kwargs else Msg.message_key

    return make_response({"error": message_text}, status)


def make_message(message_key: Msg, status=200):
    if not isinstance(message_key, Msg):
        raise ValueError(f"Message Key '{message_key}' not found in Messages")

    return make_response({"message": Msg.message_key}, status)
