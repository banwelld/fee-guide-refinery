#!/usr/bin/env python3

from services.utils.constants import PATTERN as P

PATTERN = P.copy()

# add patterns to the main pattern dict for anything specific to the
# current fee guide

# patterns for rows to omit in the is_junk function
PATTERN["JUNK"]["HEADER"] = r"^Alberta.*Fee Guide$"
PATTERN["JUNK"]["FOOTER"] = r"^Page \d+ of \d+$"

# patterns for extra-billing flags
PATTERN["EXPENSE"]["LAB"] = r"\[L\]"
PATTERN["EXPENSE"]["EXTRA_BILLING"] = r"\[E\](?!,)"
PATTERN["EXPENSE"]["PROFFESIONAL_SERVICE"] = r"\[PS\]"

# patterns for fee strategy recognition
PATTERN["FEE_STRATEGY"]["FEE"] = (
    rf"(?<!{PATTERN['CENTS']} to )\${PATTERN['FEE']}(?: per)?$"
)
PATTERN["FEE_STRATEGY"]["FEE_RANGE"] = (
    rf"\${PATTERN['FEE']} to \${PATTERN['FEE']}$"
)
PATTERN["FEE_STRATEGY"]["NO_FEE"] = r"NO FEE$"
PATTERN["FEE_STRATEGY"]["IC"] = r"I\.C\.$"
PATTERN["FEE_STRATEGY"]["BILL_AS_LAB"] = r"LAB$"
PATTERN["FEE_STRATEGY"]["MESSAGE"] = r"Add \d{1,2}% to$"

# patterns for useless text to be discarded
PATTERN["EXPENSE"]["CONNECTOR"] = rf"(?<=\[[LE]\]) and/or ${PATTERN['FEE']}?$"

# patterns for the basic components of a standard fee guide row
PATTERN["ROW"]["PROCEDURE_CODE"] = rf"(?P<code>{PATTERN['PROCEDURE_CODE']})"
PATTERN["ROW"]["DESCRIPTION"] = r"(?P<description>.*?)"
PATTERN["ROW"]["FEE_STRATEGY"] = (
    rf"(?P<strategy>"
    rf"{PATTERN['FEE_STRATEGY']['FEE_RANGE']}"
    rf"|{PATTERN['FEE_STRATEGY']['FEE']}"
    rf"|{PATTERN['FEE_STRATEGY']['IC']}"
    rf"|{PATTERN['FEE_STRATEGY']['NO_FEE']}"
    rf"|{PATTERN['FEE_STRATEGY']['BILL_AS_LAB']}"
    rf"|{PATTERN['FEE_STRATEGY']['MESSAGE']}"
    # the dummy that stands in for a fee in error in lab procedures
    r"|(?<=\[[LE]\]) \|$"
    rf")"
)

# pattern for a standard row
PATTERN["ROW"]["STANDARD"] = (
    f"^{PATTERN['ROW']['PROCEDURE_CODE']} {PATTERN['ROW']['DESCRIPTION']} {PATTERN['ROW']['FEE_STRATEGY']}"
)
