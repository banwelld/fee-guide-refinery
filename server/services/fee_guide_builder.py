#!/usr/bin/env python3

import os
from pathlib import Path
from typing import Iterator, List, Union

from werkzeug.datastructures import FileStorage

from services.extract import generate_text_from_pdf
from services.transform import normalize_fee_guide, remove_junk_lines
from services.utils.config import FEE_GUIDE_CONFIG
from services.utils.enums import ProvinceCode, Specialty

PROV = ProvinceCode.AB
SPEC = Specialty.GEN
YEAR = "2025"

CONFIG = FEE_GUIDE_CONFIG[PROV][SPEC][YEAR]


def build_fee_guide(
    pdf_source: Union[FileStorage, str], config: dict, password: str = None
) -> List[str]:
    raw_text: Iterator = generate_text_from_pdf(pdf_source, password)
    clean_lines: List[str] = remove_junk_lines(raw_text, config["junk_strategy"])
    normalized_lines: list[str] = normalize_fee_guide(
        clean_lines, config["normalization_rules"]
    )

    return normalized_lines


if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent
    pdf_path = base_dir / "data" / "raw" / "FeeGuideAlberta.pdf"

    os.system("cls" if os.name == "nt" else "clear")
    print(f"Starting ETL Pipeline for {pdf_path.name}...")

    header_chars = 60
    header_outline = f"{'=' * header_chars}"

    try:
        results = build_fee_guide(pdf_source=str(pdf_path), config=CONFIG)
        print("\n✅ Pipeline completed successfully!")
        print(f"\nTotal clean lines extracted: {len(results)}")

        write_text_to_file(
            "\n".join(results),
            "/Users/Mosaic_1/Development/Code/projects/phase-5-project/fee-guide-refinery/server/data/test/test_output.txt",
        )

        print("\n\n" + header_outline)
        print("***  First 200 Lines  ***".center(header_chars))
        print(header_outline + "\n")

        for line in results[:200]:
            print(line)

        print("\n\n" + header_outline)
        print("--- Last 200 Lines ---".center(header_chars))
        print(header_outline + "\n")

        for line in results[-200:]:
            print(line)
        print("\n")

    except Exception as e:
        print(f"❌ Pipeline Failed: {e}")
