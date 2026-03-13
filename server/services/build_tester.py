#!/usr/bin/env python3

from pathlib import Path
from typing import Iterator, List, Union

from werkzeug.datastructures import FileStorage

from services.extract import generate_text_from_pdf
from services.transform import remove_junk_lines
from services.utils.config import GUIDE
from services.utils.enums import ProvinceCode, Specialty

PROV = ProvinceCode.AB
SPEC = Specialty.GEN
YEAR = "2025"

CONFIG = GUIDE[PROV][SPEC][YEAR]["junk_strategy"]


def build_fee_guide(
    pdf_source: Union[FileStorage, str], junk_config: List[dict], password: str = None
) -> List[str]:
    raw_text: Iterator = generate_text_from_pdf(pdf_source, password)
    clean_lines: List[str] = remove_junk_lines(raw_text, junk_config)

    return clean_lines


if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent
    pdf_path = base_dir / "data" / "raw" / "FeeGuideAlberta.pdf"
    save_path = base_dir / "data" / "test" / "test_output.txt"

    def has_code(string):
        first_5 = string[0:5].strip()
        return len(first_5) == 5 and first_5.isdecimal()

    results = build_fee_guide(pdf_source=str(pdf_path), junk_config=CONFIG)

    bundled_items = []
    current_bundle = []

    for line in results:
        if has_code(line):
            if current_bundle:
                bundled_items.append(current_bundle.copy())
                current_bundle.clear()
            current_bundle.append(line)
            continue
        if current_bundle:
            current_bundle.append(line)

    nl = "\n"
    line_2_list = [
        f"{nl.join(bundle)}\n{'-' * 60}"
        for bundle in bundled_items
        if bundle[0][2:5] == "000"
    ]

    output = "\n".join(line_2_list)

    with open(save_path, "w", encoding="utf=8") as output_file:
        output_file.write(output)
