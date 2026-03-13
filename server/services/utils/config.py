#!/usr/bin/env python3

FEE_GUIDE_CONFIG = {
    "AB": {
        "general_practice": {
            "2025": {
                "junk_strategy": [
                    {
                        "method": "drop_all",
                        "precursor_key": 'information."',
                        "terminal_key": "2025 Dental Fee Guide for General Dentists",
                    },
                    {
                        "method": "drop_junk",
                        "precursor_key": "99120 For services whose descriptors include the [E] flag",
                        "terminal_key": "99121 Materials, including medications used during the delivery of a service [E] |",
                        "patterns": [
                            "|",
                            "[PS] |",
                            ("Page", "of 61"),
                            "Alberta Dental Association 2025 GP Fee Guide",
                        ],
                    },
                ],
                "normalization_rules": [
                    {
                        "strategy": "merge_fragment_with_next",
                        "anchor_match": "per",
                        "anchor_operator": "endswith",
                        "fragment_match": ("diem", "hour"),
                        "fragment_operator": "exact_match",
                    },
                    {
                        "strategy": "append_fragment_to_prev",
                        "fragment_match": "Surgical fee",
                        "fragment_operator": "exact_match",
                    },
                    {
                        "strategy": "append_fragment_to_prev",
                        "fragment_match": r"^\d{5}.* (?:and|or) \d{5}.?$",
                        "fragment_operator": "regex_match",
                    },
                    {
                        "strategy": "append_fragment_to_prev",
                        "fragment_match": "[E]",
                        "fragment_operator": "exact_match",
                    },
                    {
                        "strategy": "join_separated",
                        "anchor": "[L] and/or",
                        "fragment": "[E]",
                    },
                    {
                        "strategy": "standardize",
                        "replace": "|",
                        "cannonical": "I.C.",
                    },
                    {
                        "strategy": "standardize",
                        "replace": "Add 25% to Surgical fee",
                        "cannonical": "I.C.",
                    },
                    {
                        "strategy": "standardize",
                        "replace": "LAB",
                        "cannonical": "I.C.",
                    },
                ],
                "formatting": {
                    "expenses": {"L": "[L]", "E": "[E]", "PS": "[PS]"},
                    "fee_strategy": {
                        "range_separator": "to",
                        "no_fee": "NO FEE",
                        "IC": "I.C.",
                    },
                },
            },
        },
    },
}
