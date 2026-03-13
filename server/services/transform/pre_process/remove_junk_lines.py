#!/usr/bin/env python3

from collections import deque
from typing import Any, Dict, Iterator, List


def _extract_section(
    line_iterator: Iterator[str], precursor_key: str, terminal_key: str
) -> Iterator[str]:
    """Helper generator to consume the iterator bounded by precursor and terminal keys."""
    is_primed = False

    for line in line_iterator:
        yield line

        if line == precursor_key:
            is_primed = True
        elif is_primed:
            if line == terminal_key:
                break

            is_primed = False


def drop_junk(section_lines: Iterator[str], junk_config: Dict[str, Any]) -> List[str]:
    """
    **Description:**
    Takes an iterator of section lines and keeps useable lines based on
    provided configuration.
    """
    junk_patterns = junk_config["patterns"]

    string_patterns = [p for p in junk_patterns if isinstance(p, str)]
    tuple_patterns = [(p[0], p[1]) for p in junk_patterns if isinstance(p, tuple)]

    good_lines = []

    for line in section_lines:
        if any(
            p in line for p in string_patterns if not (line.endswith(p) and p != line)
        ):
            continue

        if any(
            line.startswith(start) and line.endswith(end)
            for start, end in tuple_patterns
        ):
            continue

        good_lines.append(line)

    return good_lines


def remove_junk_lines(
    text_from_pdf: Iterator, junk_config: List[Dict[str, Any]]
) -> List[str]:
    remaining_lines = []

    for section in junk_config:
        method_name = section["method"]
        precursor = section["precursor_key"]
        terminal = section["terminal_key"]

        raw_section_lines = _extract_section(text_from_pdf, precursor, terminal)

        if method_name == "drop_junk":
            filtered_lines = drop_junk(raw_section_lines, section)
            if filtered_lines:
                remaining_lines.extend(filtered_lines)
        elif method_name == "drop_all":
            # Consume and discard the generator entirely
            deque(raw_section_lines, maxlen=0)
        else:
            raise ValueError(f"Invalid junk removal method: {method_name}")

    return remaining_lines
