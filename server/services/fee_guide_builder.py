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

    os.system("cls" if os.name == "nt" else "clear")
    print(f"Starting ETL Pipeline for {pdf_path.name}...")

    header_chars = 60
    header_outline = f"{'=' * header_chars}"

    try:
        results = build_fee_guide(pdf_source=str(pdf_path), junk_config=CONFIG)
        print("\n✅ Pipeline completed successfully!")
        print(f"\nTotal clean lines extracted: {len(results)}")

        print("\n\n" + header_outline)
        print("***  First 5 Cleaned Lines  ***".center(header_chars))
        print(header_outline + "\n")

        for line in results[:5]:
            print(line)

        print("\n\n" + header_outline)
        print("--- Last 5 Cleaned Lines ---".center(header_chars))
        print(header_outline + "\n")

        for line in results[-5:]:
            print(line)
        print("\n")

    except Exception as e:
        print(f"❌ Pipeline Failed: {e}")
