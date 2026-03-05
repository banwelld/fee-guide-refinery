from services.models import Category, Procedure
from services.parsers.alberta_gp_2025 import (
    PATTERN,
    is_junk,
    merge_rows,
    parse_rows,
    root_row,
)


def test_is_junk_filters_correctly():
    assert is_junk("Alberta Dental Association Fee Guide") is True
    assert is_junk("Page 1 of 120") is True
    assert is_junk("   ") is True
    assert is_junk("12  ") is True  # Length check
    assert is_junk("01010 FIRST DENTAL VISIT") is False


def test_merge_rows_stitches_multiline_descriptions():
    lines = [
        "12345 Start of an amazing procedure",
        "Alberta Dental Association Fee Guide",  # Should be skipped
        "Page 2 of 10",  # Should be skipped
        "that continues onto a second line",
        "54321 Next procedure starts here",
    ]

    merged = merge_rows(lines, root_row, is_junk)

    assert len(merged) == 2
    assert (
        merged[0]
        == "12345 Start of an amazing procedure that continues onto a second line"
    )
    assert merged[1] == "54321 Next procedure starts here"


def test_parse_rows_extracts_category():
    rows = ["10000 DIAGNOSTIC SERVICES"]
    results = parse_rows(rows, PATTERN)

    assert len(results) == 1
    category = results[0]

    assert isinstance(category, Category)
    assert category.code == "10000"
    assert category.description == "DIAGNOSTIC SERVICES"
    assert category.has_PS_flag is False


def test_parse_rows_extracts_standard_procedure():
    rows = ["12345 Regular Exam $135.94"]
    results = parse_rows(rows, PATTERN)

    assert len(results) == 1
    procedure = results[0]

    assert isinstance(procedure, Procedure)
    assert procedure.code == "12345"
    assert procedure.description == "Regular Exam"
    assert procedure.fee_min == 0
    assert procedure.fee_max == 13594
    assert procedure.has_IC is False


def test_parse_rows_extracts_fee_range():
    rows = ["99999 Some range $10.00 to $20.00"]
    results = parse_rows(rows, PATTERN)

    procedure = results[0]
    assert procedure.fee_min == 1000
    assert procedure.fee_max == 2000
    assert procedure.description == "Some range"


def test_parse_rows_extracts_missing_to_fallback():
    rows = ["99999 Two fees missing to $10.00 $20.00"]
    results = parse_rows(rows, PATTERN)

    procedure = results[0]
    assert procedure.fee_min == 1000
    assert procedure.fee_max == 2000
    assert procedure.description == "Two fees missing to"


def test_parse_rows_recovers_from_too_many_fees():
    rows = ["99999 Three fees $10.00 $15.00 $20.00"]
    results = parse_rows(rows, PATTERN)

    procedure = results[0]
    # The Engine should fallback to absolute min and absolute max
    assert procedure.fee_min == 1000
    assert procedure.fee_max == 2000
    assert procedure.description == "Three fees"


def test_parse_rows_extracts_boolean_flags():
    rows = [
        "55111 Prosthesis [L] [E] I.C.",
        "55112 Something else NO FEE",
        "55113 Another thing LAB Add 25% to Surgical fee",
    ]
    results = parse_rows(rows, PATTERN)

    assert len(results) == 3

    proc_1 = results[0]
    assert proc_1.description == "Prosthesis"
    assert proc_1.fee_max == 0
    assert proc_1.has_L_flag is True
    assert proc_1.has_E_flag is True
    assert proc_1.has_IC is True

    proc_2 = results[1]
    assert proc_2.description == "Something else"
    assert proc_2.has_no_fee is True

    proc_3 = results[2]
    assert proc_3.description == "Another thing"
    assert proc_3.bill_as_lab is True
    assert proc_3.increase_alternate_fee is True
