import re
from typing import Dict, List


def _apply_operator(line: str, pattern: any, operator: str) -> bool:
    """Helper to apply the comparison logic defined in NORM_CONFIG."""
    clean_line = line.strip()
    if operator == "exact_match":
        if isinstance(pattern, (list, tuple)):
            return clean_line in pattern
        return clean_line == pattern
    if operator == "endswith":
        return clean_line.endswith(pattern)
    if operator == "regex_match":
        return bool(re.match(pattern, clean_line))
    return False


def _merge_fragment_with_next(lines: List[str], rule: Dict) -> List[str]:
    """
    Helper that identifies lines that were poorly formed in the original document
    (text shoehorned in after the fee info) and that were broken in extraction
    because of that.
    """
    next_pass = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if (
            i + 1 < len(lines)
            and _apply_operator(line, rule["anchor_match"], rule["anchor_operator"])
            and _apply_operator(
                lines[i + 1],
                rule["fragment_match"],
                rule["fragment_operator"],
            )
        ):
            next_pass.append(f"{line} {lines[i + 1]}")
            i += 2
        else:
            next_pass.append(line)
            i += 1
    return next_pass


def _append_fragment_to_prev(lines: List[str], rule: Dict) -> List[str]:
    """
    Helper that identifies lines that broke because the nonstandard language
    made them far too long. Because this is critical data, it appends the
    fragment to the original line.
    """
    next_pass = []
    for line in lines:
        if next_pass and _apply_operator(
            line, rule["fragment_match"], rule["fragment_operator"]
        ):
            next_pass[-1] = f"{next_pass[-1]} {line}"
        else:
            next_pass.append(line)
    return next_pass


def _join_separated(lines: List[str], rule: Dict) -> List[str]:
    """
    Reunites fragments that were appended to the line in a previous
    pass but are positioned incorrectly.
    """
    next_pass = []
    anchor = rule["anchor"]
    fragment = rule["fragment"]

    for line in lines:
        if anchor in line and fragment in line:
            clean_line = line.replace(f" {fragment}", "").replace(fragment, "").strip()

            new_line = clean_line.replace(anchor, f"{anchor} {fragment}")
            next_pass.append(new_line)
        else:
            next_pass.append(line)

    return next_pass


def _standardize(lines: List[str], rule: Dict) -> List[str]:
    """
    Purely string replacement for nonstandard namings or fee strategies that
    deviate slightly from standard but keep enough of the cannonical underpinnings
    that they still qualify as a conventional strategy.
    """
    next_pass = []
    for line in lines:
        next_pass.append(line.replace(rule["replace"], rule["cannonical"]))
    return next_pass


STRATEGY_MAP = {
    "merge_fragment_with_next": _merge_fragment_with_next,
    "append_fragment_to_prev": _append_fragment_to_prev,
    "join_separated": _join_separated,
    "standardize": _standardize,
}


def normalize_fee_guide(fee_guide_lines: List[str], config: List[Dict]) -> List[str]:
    """
    **Description:**
    Orchestrates the normalization process, which ensures that translation errors from
    PDF extraction are fixed along with replacing any nonstandard/regional terminology
    that is not widely used elsewhere.
    """
    current_lines = list(fee_guide_lines)

    for rule in config:
        strategy_name = rule.get("strategy")
        strategy_func = STRATEGY_MAP.get(strategy_name)

        if strategy_func:
            current_lines = strategy_func(current_lines, rule)
        else:
            print(f"Warning: No helper found for strategy: '{strategy_name}'")

    return current_lines
