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
    NO_FILE = "No {file_name} file provided."
    INVALID_CODE = "Invalid {code_type} code."
    NO_CONFIG = "No configuration found for {province} {specialty} {year}."
    GUIDE_EXISTS = "Fee guide already exists."
    PDF_EXTRACT_FAIL = "Failed to extract text from PDF: {error}"
    DB_LOAD_FAIL = "Failed to load procedures into DB: {error}"

    def __call__(self, **kwargs):
        return self.value.format(**kwargs) if kwargs else self.value
