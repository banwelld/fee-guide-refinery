import os
import re

from services.utils.helpers import (
    line_list_to_text_or_json,
    text_file_to_lines,
    toggle_steps,
)

ROOT_PATH = os.path.dirname(__file__)

SOURCE_FILE_DIR = os.path.join(ROOT_PATH, "data", "raw")
SOURCE_FILE = os.path.join(SOURCE_FILE_DIR, "CDA_code_list.txt")

OUTPUT_DATA_DIR = os.path.join(ROOT_PATH, "data", "test")
OUTPUT_FILE = os.path.join(OUTPUT_DATA_DIR, "CDA_procedure_codes.json")


# code_pattern = re.compile(r"^\d{5}\s")
# fee_pattern = re.compile(
#     r"(?:\$\d{1,3}(?:,\d{3})*\.\d{2}|I\.C\.|NO FEE|LAB|Add 25% to Surgical fee)$"
# )

# in_procedure = False

# for i, line in enumerate(lines):
#     if re.match(r"^(Alberta.*Fee Guide|Page \d+ of \d+)$", line):
#         continue

#     if code_pattern.match(line):
#         # Check if it's a category (often ends in 00 or no fee ever)
#         # For this test, just see if it has a fee
#         has_fee = fee_pattern.search(line)
#         in_procedure = not has_fee and not re.match(r"^\d{3}00\s", line)
#     else:
#         if in_procedure:
#             if fee_pattern.search(line):
#                 in_procedure = False  # procedure finished
#         else:
#             # We are NOT in a procedure hunting for a fee.
#             # All these lines should be trash or category continuations.
#             pass

if __name__ == "__main__":
    CDA_codes_raw = text_file_to_lines(SOURCE_FILE)

    current_step = 0
    total_steps = 3
    step_key = {0: "code", 1: "name_short", 2: "name_long"}

    code_pattern = r"(^\d{5}$)"
    new_category_flag = r"Back to top"

    procedure_list = []
    current_procedure = {}
    category = ""

    for line in CDA_codes_raw:
        if current_step == 0:
            if re.match(new_category_flag, line):
                continue

            if re.match(code_pattern, line):
                current_procedure["category"] = category
                current_procedure[step_key[current_step]] = line
                current_step = toggle_steps(current_step, total_steps)
                continue

            category = line
            continue

        if current_step == 1:
            current_procedure[step_key[current_step]] = line
            current_step = toggle_steps(current_step, total_steps)
            continue

        if current_step == 2:
            current_procedure[step_key[current_step]] = line
            procedure_list.append(current_procedure)
            current_procedure = {}
            current_step = toggle_steps(current_step, total_steps)
            continue

    line_list_to_text_or_json(procedure_list, OUTPUT_FILE)
