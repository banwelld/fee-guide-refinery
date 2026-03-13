#!/usr/bin/env python3

import json
from typing import Dict, List, Union


def toggle_steps(current_step_count: int, total_step_count: int) -> int:
    """
    **Description:**
    Uses the modulo % operator to loop through numbers (starting at 0)
    in a set, returning to 0 automatically after toggling through to
    the last step
    """
    return (current_step_count + 1) % total_step_count


def read_text_from_file(filepath) -> str:
    with open(filepath, "r", encoding="utf-8") as source:
        data = source.read()

    return data


def write_text_to_file(data, filepath):
    with open(filepath, "w", encoding="utf-8") as destination:
        destination.write(data)


def read_json_from_file(filepath) -> Union[Dict, List]:
    with open(filepath, "r", encoding="utf-8") as source:
        data = json.load(source)

    return data


def write_json_to_file(data, filepath):
    with open(filepath, "w", encoding="utf-8") as destination:
        json.dump(data, destination, indent=4)
