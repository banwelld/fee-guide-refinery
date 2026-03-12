#!/usr/bin/env python3

GUIDE = {
    "AB": {
        "general_practice": {
            "2025": {
                "junk_strategy": [
                    {
                        "method": "drop_all",
                        "precursor_key": "2025 Dental Fee Guide for General Dentists",
                        "terminal_key": "Alberta Dental Association 2025 GP Fee Guide",
                    },
                    {
                        "method": "drop_junk",
                        "precursor_key": "00000 DIAGNOSTIC",
                        "terminal_key": "Page 61 of 61",
                        "patterns": [
                            "Alberta Dental Association 2025 GP Fee Guide",
                            ("Page", "of 61"),
                        ],
                    },
                ],
                "processing": [
                    "correct_fee_strategy_names",
                    "keep_lines_with_codes",
                    "propagate_PS_flags",
                ],
                "known_issues": {
                    "dropped_fragments": [
                        "[E]",
                        "Surgical fee",
                    ]
                },
                "formats": {
                    "expense": "bracketed",
                    "currency": {
                        "symbol": "$",
                        "separator": ",",
                    },
                    "fee_strategy": {
                        "fee": "end_of_line",
                        "range": "to",
                        "no_fee": [
                            "no_fee_allcaps",
                            "bill_as_other",
                        ],
                        "IC": "all_caps_periods",
                    },
                },
            },
        },
    },
    "BC": {
        "general_practice": {
            "2024": {
                "preamble": {
                    "last_line": "( xi )",
                },
                "general_fees": {
                    "first_line": "2024 - DIAG / 1",
                    "last_line": "Note: This code is to be used only when travel occurs over and above the",
                    "junk": [
                        "Alberta Dental Association 2025 GP Fee Guide",  # header
                        ("Page", "of 61"),  # footer
                    ],
                },
                "formats": {
                    "expense": "plus_spaced",
                    "currency": {
                        "symbol": "",
                        "separator": "comma",
                    },
                    "fee": "precedes_expenses",
                    "range": "-",
                    "no_fee": "",
                    "IC": "all_caps_periods",
                    "expense_only": "",
                },
            },
        },
    },
    "MB": {},
    "NB": {},
    "NF": {},
    "NS": {},
    "NT": {},
    "NU": {},
    "ON": {
        "general_practice": {
            "2022": {
                "preamble": {
                    "last_line": (
                        "8 Suggested Fee Guide 2022 | General Practitioners "
                        "Copyright, Ontario Dental Association 1990"
                    ),
                },
                "general_fees": {
                    "first_line": "DIAGNOSIS",
                    "last_line": (
                        "78 Suggested Fee Guide 2022 | General Practitioners "
                        "Copyright, Ontario Dental Association 1990"
                    ),
                    "junk": [
                        "Suggested Fee Guide 2022 | General Practitioners Copyright, "
                        "Ontario Dental Association 1990"
                    ],
                },
                "formats": {
                    "expense": "plus_tight",
                    "currency": {
                        "symbol": "",
                        "separator": "",
                    },
                    "fee": "end_of_line",
                    "range": "hyphen_join",
                    "no_fee": "no_fee_titlecase",
                    "IC": "all_caps_periods",
                    "expense_only": "",
                },
            },
        },
    },
    "PE": {},
    "QC": {},
    "SK": {},
    "YT": {},
}
