#!/usr/bin/env python3

import os
from pathlib import Path
from typing import Iterator, List, Union

from werkzeug.datastructures import FileStorage

from services.extract import generate_text_from_pdf
from services.models import Procedure
from services.transform import (
    normalize_fee_guide,
    remove_junk_lines,
    transform_lines_to_models,
)
from services.utils.config import FEE_GUIDE_CONFIG
from services.utils.enums import ProvinceCode, Specialty

def build_fee_guide(
    pdf_source: Union[FileStorage, str],
    config: dict,
    province: str,
    specialty: str,
    year: str,
    password: str = None,
) -> List[Procedure]:
    raw_text: Iterator = generate_text_from_pdf(pdf_source, password)
    clean_lines: List[str] = remove_junk_lines(raw_text, config["junk_strategy"])
    normalized_lines: list[str] = normalize_fee_guide(
        clean_lines, config["normalization_rules"]
    )

    return transform_lines_to_models(normalized_lines, config, province, specialty, year)


if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent
    pdf_path = base_dir / "data" / "raw" / "FeeGuideAlberta.pdf"

    os.system("cls" if os.name == "nt" else "clear")
    print(f"Starting ETL Pipeline for {pdf_path.name}...")

    header_chars = 60
    header_outline = f"{'=' * header_chars}"

    prov = ProvinceCode.AB
    spec = Specialty.GEN
    year = "2025"
    config = FEE_GUIDE_CONFIG[prov][spec][year]

    try:
        results = build_fee_guide(
            pdf_source=str(pdf_path),
            config=config,
            province=prov,
            specialty=spec,
            year=year,
        )
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
