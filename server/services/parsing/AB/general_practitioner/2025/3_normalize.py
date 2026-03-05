#!/usr/bin/env python3

import os
import re
from typing import Callable, List, Pattern


PATH_ROOT = os.path.dirname(__file__)

SOURCE_FILE_DIR = os.path.join(PATH_ROOT, "data", "raw")
SOURCE_FILE = os.path.join(SOURCE_FILE_DIR, "dumped_output.txt")

OUTPUT_DATA_DIR = os.path.join(PATH_ROOT, "data", "test")
OUTPUT_FILE = os.path.join(OUTPUT_DATA_DIR, "test_output.py")


standard_row = re.compile(PATTERN["ROW"]["STANDARD"])


def fee_string_to_int(fee: str) -> int:
    int(fee.replace("$", "").replace(",", "").replace(".", ""))


def remove_excess_whitespace(string: str):
    return re.sub(r"\s{2,}", " ", string).strip()


def is_junk(row: str) -> bool:
    is_glitch = not row or len(row.replace(" ", "")) < 3
    if is_glitch:
        return True
    return False


def remove_page_delimiters(fee_guide: str) -> List[str]:
    completed_rows = []
    row_under_construction = {}

    for current_row in rows:
        # trash collection for PDF table border artifacts
        current_row = current_row.replace("|", "").strip()

        if is_junk(current_row):
            continue

        if not standard_row.match(current_row) and not row_under_construction:
            continue

        if standard_row.match(current_row):
            # if the current row is a root, the row under construction gets moved to merged_rows
            if row_under_construction:
                completed_rows.append(row_under_construction)
            row_under_construction = current_row
        else:
            row_under_construction = f"{row_under_construction} {current_row}"

    if row_under_construction:
        merged_rows.append(row_under_construction)

    return merged_rows


def merge_rows(
    rows: List[str],
    standard_row: Pattern,
    is_junk: Callable,
) -> List[str]:
    merged_rows = []
    row_under_construction = ""

    for current_row in rows:
        # trash collection for PDF table border artifacts
        current_row = current_row.replace("|", "").strip()

        if is_junk(current_row):
            continue

        if not standard_row.match(current_row) and not row_under_construction:
            continue

        if standard_row.match(current_row):
            # if the current row is a root, the row under construction gets moved to merged_rows
            if row_under_construction:
                merged_rows.append(row_under_construction)
            row_under_construction = current_row
        else:
            row_under_construction = f"{row_under_construction} {current_row}"

    if row_under_construction:
        merged_rows.append(row_under_construction)

    return merged_rows


def parse_rows(
    rows: List[str], PATTERN: Dict[str, Union[Pattern, Dict, str]]
) -> List[Union[Category, Procedure]]:
    fee_guide = []

    fees = re.compile(rf"{PATTERN['FEE']['STANDARD']} per .{4}")
    fee_strategies = re.compile(
        f"{PATTERN['FEE_STRATEGY']['IC']}"
        rf"|{PATTERN['FEE_STRATEGY']['NO_FEE']}"
        rf"|{PATTERN['FEE_STRATEGY']['BILL_AS_LAB']}"
        rf"|{PATTERN['FEE_STRATEGY']['ADD_TO_ALT_PERCENT']}"
    )


for current_row in rows:
    match_object = standard_row.match(current_row)
    if not match_object:
        continue

    # start defining the row object's attributes with a value that we know exists
    object_attribs = {"procedure_code": match_object.group("procedure_code")}

    description = match_object.group("description")

    has_fee = bool(fees.match(description))
    fee_strategy = fee_strategies.match(description)

    if fee_range := re.match(PATTERN["FEE"]["RANGE"], description):
        fee_min = fee_range.group("fee_min")
        fee_max = fee_range.group("fee_max")

        object_attribs["fee_min"] = fee_string_to_int(fee_min)
        object_attribs["fee_max"] = fee_string_to_int(fee_max)

        description = re.sub(PATTERN["FEE"]["RANGE"], "", description)

    if has_fee:
        fee_list = re.findall(PATTERN["FEE"]["STANDARD"], description)
        fee_max = fee_list[-1]

        object_attribs["fee_max"] = fee_string_to_int(fee_max)

        description = description.replace(fee_max, "")

    if has_IC := "I.C." in fee_strategy_list:
        object_attribs["has_IC"] = True

    has_no_fee = "NO FEE" in fee_strategy_list
    bill_as_lab = "LAB" in fee_strategy_list
    increase_alternate_fee = "Add 25% to Surgical fee" in fee_strategy_list

    has_L_flag = "[L]" in expense_list
    has_E_flag = "[E]" in expense_list

    # connectors have to go first because regex uses fees and expenses to find them
    description = re.sub(PATTERN["EXPENSE"]["CONNECTOR"], "", description)

    description = fee_strategies.sub("", description)
    description = expenses.sub("", description)

    # reduce extra white space
    description = re.sub(r"\s{2,}", " ", description).strip()

    procedure = Procedure(
        code=code,
        description=description,
        fee_min=fee_min,
        fee_max=fee_max,
        has_IC=has_IC,
        has_no_fee=has_no_fee,
        has_L_flag=has_L_flag,
        has_E_flag=has_E_flag,
        bill_as_lab=bill_as_lab,
        increase_alternate_fee=increase_alternate_fee,
    )
    fee_guide.append(procedure)

    PS_flag = re.compile(PATTERN["EXPENSE"]["PROFESSIONAL_SERVICE"])

    if PS_flag.match(description):
        object_attribs["has_PS_flag"] = True
        description = remove_whitespace(PS_flag.sub("", description))

    object_attribs["description"] = description

    fee_guide.append(Category(**object_attribs))
    continue

    if PS_flag.match(description):
        object_attribs["has_PS_flag"] = True
        description = remove_whitespace(PS_flag.sub("", description))

    object_attribs["description"] = description

    fee_guide.append(Category(**object_attribs))
    continue

return fee_guide


if __name__ == "__main__":
    print(PATTERN["ROW"]["STANDARD"])
