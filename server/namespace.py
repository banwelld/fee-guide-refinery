from enum import Enum


class Message(str, Enum):
    UNAVAILABLE = "{year} fee guides are not yet available."
    NO_EMPTY = "{item} cannot be empty string."
    ROLE_INVALID = "Invalid user role."
    EMAIL_INVALID = "Invalid email address"
    NOT_AUTHENTICATED = "User is not authenticated."
    UNAUTHORIZED = "User credentials do not align with request."
    MISSING_FIELDS = "Missing required fields: {fields}"
    EMAIL_TAKEN = "Email address already in use."
    NO_DATA = "No data provided."
    INVALID_CREDS = "Invalid email or password."
    LOGGED_OUT = "Logout successful."

    def __call__(self, **kwargs):
        return self.value.format(**kwargs) if kwargs else self.value
