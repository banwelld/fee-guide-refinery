from enums import Enum


class Messages(str, Enum):
    UNAVAILABLE = "{year} fee guides are not yet available."
    NO_EMPTY = "{item} cannot be empty string."
    ROLE_INVALID = "Invalid user role."
    EMAIL_INVALID = "Invalid email address"

    def __call__(self, **kwargs):
        self.value.format(**kwargs)
