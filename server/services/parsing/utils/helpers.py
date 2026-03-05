#!/usr/bin/env python3

from typing import Union
from pathlib import Path
from typing import List
import json


def text_to_list(filepath: str) -> List[str]:
    """
    **Description:**
    Opens the text file at the filepath provided and converts text to
    a list of the file's lines, stripped them of leading/trailing
    whitespace.

    Omits lines that are empty after stripping.
    """
    if not isinstance(filepath, str):
        print(
            f"Invalid filepath data type, expected 'string' but got '{type(filepath).__name__}'"
        )
        return []

    path = Path(filepath)

    if path.suffix != ".txt":
        print(
            f"Invalid file suffix '{filepath}', expected .txt but got {path.suffix}"
        )
        return []
    if not path.exists():
        print(f"File not found: {path.absolute()}")
        return []
    if not path.is_file():
        print(f"Invalid path: '{filepath}' points to a directory, not a file.")
        return []

    with path.open("r", encoding="utf-8") as file:
        return [stripped for line in file if (stripped := line.strip())]


def list_to_text(list: List[str], filepath: Union[str, None] = None) -> str:
    """
    **Description:**
    Converts a list of strings to a single string with new-line
    delimiters and returns it. If filepath to a .txt file is passed
    in, will create or overwrite the file.
    """
    standard_error_return = "*** UNPROCESSABLE TRANSACTION ***"

    if filepath is None:
        if not all([isinstance(line, str) for line in list]):
            print("Invalid data detected. List must contain only strings.")
            return standard_error_return

        return "\n".join(list)

    if not isinstance(filepath, str):
        print(
            f"Invalid filepath data type, expected 'string' but got '{type(filepath).__name__}'"
        )
        return standard_error_return

    path = Path(filepath)

    if path.suffix != ".txt":
        print(
            f"Invalid file suffix '{filepath}', expected .txt but got {path.suffix}"
        )
        return standard_error_return

    if not all([isinstance(line, str) for line in list]):
        print("Invalid data detected. List must contain only strings.")
        return standard_error_return

    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as output_file:
        output_file.write("\n".join(list))
        return None


def pdf_to_text()


def toggle_steps(current_step_count: int, total_step_count: int) -> int:
    """
    **Description:**
    Uses the modulo % operator to loop through numbers (starting at 0)
    in a set, returning to 0 automatically after toggling through to
    the last step
    """
    return (current_step_count + 1) % total_step_count
