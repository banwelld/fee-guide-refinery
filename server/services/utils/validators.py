#!/usr/bin/env python3

from pathlib import Path
from typing import Any, Type, Union

from werkzeug.datastructures import FileStorage

standard_exception_return = "*** UNABLE TO PROCESS FILE ***"


# validators for all cases


def is_valid_type(data: Any, expected: Union[Type, tuple]) -> bool:
    is_valid = isinstance(data, expected)
    if not is_valid:
        expected_str = (
            " or ".join([t.__name__ for t in expected])
            if isinstance(expected, tuple)
            else expected.__name__
        )
        print(
            f"Invalid data type, expected '{expected_str}'"
            f"but got '{type(data).__name__}'."
        )
    return is_valid


# for FileStorage objects, pass the filename attrib as the filepath argument
def has_valid_suffix(filepath: str, expected: str) -> bool:
    if not expected.startswith("."):
        expected = f".{expected}"

    is_valid = filepath.lower().endswith(expected.lower())
    if not is_valid:
        suffix = filepath[filepath.rfind(".") :] if "." in filepath else "No Extension"

        print(f"Invalid file suffix, expected '{expected}' but got '{suffix}'.")
    return is_valid


# validators for uploaded files only


def has_valid_mimetype(file: FileStorage, expected: str) -> bool:
    is_valid = file.mimetype == expected

    if not is_valid:
        print(
            f"Invalid file, expected mimetype 'application/pdf' but got '{file.mimetype}'."
        )

    return is_valid


# validators for linked files only


def path_destination_exists(path: Path) -> bool:
    is_valid = path.exists()

    if not is_valid:
        print(f"File not found: {path.absolute()}")

    return is_valid


def is_file(path: Path) -> bool:
    is_valid = path.is_file()

    if not is_valid:
        print(f"Invalid path: '{path.absolute()}' is a directory.")

    return is_valid


def has_valid_bytes(filepath: str, expected: str) -> bool:
    with open(filepath, "rb") as test:
        is_valid = test.read(5) == expected

        if not is_valid:
            print("Invalid filepath target. File must be a valid PDF.")

        return is_valid
