from enum import Enum


class Message(str, Enum):
    UNAVAILABLE = "{year} fee guides are not yet available."
    NO_EMPTY = "{item} cannot be empty string."
    ROLE_INVALID = "Invalid user role."
    EMAIL_INVALID = "Invalid email address"
    NOT_AUTHENTICATED = "User is not authenticated."
    UNAUTHORIZED = "User credentials do not align with request."

    def __call__(self, **kwargs):
        self.value.format(**kwargs)
