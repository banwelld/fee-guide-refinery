#!/usr/bin/env python3

import os
from pathlib import Path
from typing import Iterator, List, Union

from extract import generate_text_from_pdf
from transform import remove_junk_from_text
from utils.config import GUIDE
from utils.enums import ProvinceCode, Specialty
from werkzeug.datastructures import FileStorage

PROV = ProvinceCode.AB
SPEC = Specialty.GEN
YEAR = "2025"

CONFIG = GUIDE[PROV][SPEC][YEAR]["junk_strategy"]


def build_fee_guide(
    pdf_source: Union[FileStorage, str], junk_config: List[dict], password: str = None
) -> List[str]:
    raw_text: Iterator = generate_text_from_pdf(pdf_source, password)
    clean_lines: List[str] = remove_junk_from_text(raw_text, junk_config)

    return clean_lines


if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent
    pdf_path = base_dir / "data" / "raw" / "FeeGuideAlberta.pdf"

    def has_code(string):
        first_5 = string[0:5].strip()
        return len(first_5) == 5 and first_5.isdecimal()

    os.system("cls" if os.name == "nt" else "clear")
    print(f"Starting ETL Pipeline for {pdf_path.name}...")

    try:
        results = build_fee_guide(pdf_source=str(pdf_path), junk_config=CONFIG)

        for line in results[0:20]:
            print(line)

        # bundled_items = []
        # current_bundle = []

        # for line in results:
        #     if has_code(line):
        #         if current_bundle:
        #             bundled_items.append(current_bundle.copy())
        #             current_bundle.clear()
        #         current_bundle.append(line)
        #         continue
        #     if current_bundle:
        #         current_bundle.append(line)

        #     if len(bundled_items) == 10:
        #         break

        # for item in bundled_items:
        #     print("[")
        #     for line in item:
        #         print(f"\t'{line}'")
        #     print("],")

    except Exception as e:
        print(f"❌ Pipeline Failed: {e}")
