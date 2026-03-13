#!/usr/bin/env python3

from pathlib import Path

# the project's base path and data path for raw files and test output
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR.parent / "data"

DOLLARS = (r"(?:\d{1,3}(?:,\d{3})+|\d+)",)
CENTS = r"(?:\.\d{2})"

FEE = rf"(?:\$)?({DOLLARS}{CENTS})"
FEE_RANGE = rf"{FEE}.{{3,5}}{FEE}"
