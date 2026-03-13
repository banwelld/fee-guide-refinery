#!/usr/bin/env python3

from pathlib import Path
from typing import Iterator, Union

import pdfplumber
from werkzeug.datastructures import FileStorage

from services.utils.validators import (
    has_valid_bytes,
    has_valid_mimetype,
    has_valid_suffix,
    is_file,
    is_valid_type,
    path_destination_exists,
)


def _clean_page_text(text: str) -> Iterator:
    """Takes in raw page text and yeilds clean, non-empty lines."""
    if not text:
        return
    for line in text.splitlines():
        if stripped := line.strip():
            yield stripped


def _validate_pdf_source(pdf_source: Union[str, FileStorage]) -> Iterator:
    """
    **Description:**
    Validates that the linked or included file is a valid readable PDF ducument.
    """
    filepath = (
        pdf_source.filename if isinstance(pdf_source, FileStorage) else pdf_source
    )

    if not (
        is_valid_type(pdf_source, (str, FileStorage))
        and has_valid_suffix(filepath, ".pdf")
    ):
        raise ValueError("Invalid file extension, expected a .pdf file.")

    if isinstance(pdf_source, FileStorage):
        if not has_valid_mimetype(pdf_source, "application/pdf"):
            raise ValueError("Invalid file mimetype, expected 'application/pdf'.")

    if isinstance(pdf_source, str):
        path = Path(pdf_source)
        if not (path_destination_exists(path) and is_file(path)):
            raise ValueError("File does not exist at the given path.")

        if not has_valid_bytes(pdf_source, b"%PDF-"):
            raise ValueError("Magic bytes did not match.")


def generate_text_from_pdf(
    pdf_source: Union[str, FileStorage], password: str = None
) -> Iterator:
    """
    **Description:**
    Validates PDF file type based on file source and extracts lines of
    text from a pdf file, yeilding it out to the next consumer.

    **Arguments:**
    - ***pdf_source***: (str or Flask FileStorage object) Accepts both
    filepaths and PDF files

    - ***password***: (str) the password for opening the PDF document
    """
    try:
        with pdfplumber.open(pdf_source, password) as source:
            for page in source.pages:
                yield from _clean_page_text(page.extract_text())

    except Exception as e:
        raise ValueError(
            f"Extraction failed. The PDF may be corrupt or unreadable. Error: {e}"
        ) from e
