#!/usr/bin/env python3

from pathlib import Path

# the project's base path and data path for raw files and test output
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR.parent / "data"

DOLLARS = r"(?:\d{1,3}(?:,\d{3})+|\d+)"
CENTS = r"(?:\.\d{2})"

FEE = rf"(?:\$)?({DOLLARS}{CENTS})"
FEE_RANGE = rf"{FEE}.{{3,5}}{FEE}"

CATEGORIES = {
    "00000": "Diagnosis",
    "10000": "Prevention",
    "20000": "Restoration",
    "30000": "Endodontics",
    "40000": "Periodontics",
    "50000": "Prosthodontics – Removable",
    "60000": "Prosthodontics – Fixed",
    "70000": "Oral & Maxillofacial Surgery",
    "80000": "Orthodontics",
    "90000": "Adjunctive General Services",
}
