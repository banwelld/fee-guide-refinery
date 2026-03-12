#!/usr/bin/env python3

# global fee guide parsing patterns
# empty values represent globally needed items that differ guide-to-guide
PATTERN = {
    "DOLLARS": r"(?:\d{1,3}(?:,\d{3})+|\d+)",
    "CENTS": r"(?:\.\d{2})",
    "PROCEDURE_CODE": r"\d{5}",
    "ROW": {
        "START": "",
        "END": "",
    },
    "expense": {
        "LAB": "",
        "MATERIALS": "",
    },
    "fee_strategy": {
        "FEE": "",
        "FEE_RANGE": "",
        "no_fee": "",
        "IC": "",
    },
}
PATTERN["FEE"] = rf"(?:\$)?(?:{PATTERN['DOLLARS']}{PATTERN['CENTS']})"
