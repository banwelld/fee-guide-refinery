#!/usr/bin/env python3

import os
from pathlib import Path
from typing import Iterator, List, Union

from werkzeug.datastructures import FileStorage

from services.extract import generate_text_from_pdf
from services.models import Category, Procedure
from services.transform import (
    normalize_fee_guide,
    remove_junk_lines,
    transform_lines_to_models,
)
from services.utils.config import FEE_GUIDE_CONFIG
from services.utils.enums import ProvinceCode, Specialty

PROV = ProvinceCode.AB
SPEC = Specialty.GEN
YEAR = "2025"

CONFIG = FEE_GUIDE_CONFIG[PROV][SPEC][YEAR]


def build_fee_guide(
    pdf_source: Union[FileStorage, str], config: dict, password: str = None
) -> List[Union[Category, Procedure]]:
    raw_text: Iterator = generate_text_from_pdf(pdf_source, password)
    clean_lines: List[str] = remove_junk_lines(raw_text, config["junk_strategy"])
    normalized_lines: list[str] = normalize_fee_guide(
        clean_lines, config["normalization_rules"]
    )

    return transform_lines_to_models(normalized_lines, config, PROV, SPEC, YEAR)


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
        print(f"\nTotal records extracted: {len(results)}")

        print("\n\n" + header_outline)
        print("***  First 10 Records  ***".center(header_chars))
        print(header_outline + "\n")

        for record in results[:10]:
            record.info_dump()

        print("\n\n" + header_outline)
        print("--- Last 10 Records ---".center(header_chars))
        print(header_outline + "\n")

        for record in results[-10:]:
            record.info_dump()
        print("\n")

    except Exception as e:
        print(f"❌ Pipeline Failed: {e}")
