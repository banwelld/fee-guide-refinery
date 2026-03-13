import re
from typing import Any, Dict, List


def _matches_rule(line: str, pattern: Any, operator: str) -> bool:
    """
    Does this line match the pattern using the given operator?
    """
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


def _run_merge_strategy(lines: List[str], rule: Dict) -> List[str]:
    """
    Walks through the lines and merges an anchor with the line immediately
    following it if they match the rule.
    """
    processed_lines = []
    skip_next = False

    for i in range(len(lines)):
        if skip_next:
            skip_next = False
            continue

        current_line = lines[i]

        if i + 1 < len(lines):
            next_line = lines[i + 1]

            is_anchor = _matches_rule(
                current_line, rule["anchor_match"], rule["anchor_operator"]
            )
            is_fragment = _matches_rule(
                next_line, rule["fragment_match"], rule["fragment_operator"]
            )

            if is_anchor and is_fragment:
                processed_lines.append(f"{current_line} {next_line}")
                skip_next = True
                continue

        processed_lines.append(current_line)

    return processed_lines


def _run_append_strategy(lines: List[str], rule: Dict) -> List[str]:
    """
    If a line is a fragment, attach it onto the end of the previous line.
    """
    processed_lines = []

    for line in lines:
        if processed_lines and _matches_rule(
            line, rule["fragment_match"], rule["fragment_operator"]
        ):
            last_line = processed_lines[-1]
            processed_lines[-1] = f"{last_line} {line}"
        else:
            processed_lines.append(line)

    return processed_lines


def _run_join_separated_strategy(lines: List[str], rule: Dict) -> List[str]:
    """
    Finds a fragment that is already on the line but in the wrong spot,
    and moves it to its anchor.
    """
    processed_lines = []
    anchor = rule["anchor"]
    fragment = rule["fragment"]

    for line in lines:
        if anchor in line and fragment in line:
            clean_line = line.replace(f" {fragment}", "").replace(fragment, "").strip()

            new_line = clean_line.replace(anchor, f"{anchor} {fragment}")
            processed_lines.append(new_line)
        else:
            processed_lines.append(line)

    return processed_lines


def _run_standardize_strategy(lines: List[str], rule: Dict) -> List[str]:
    """
    Simple find-and-replace for specific strings.
    """
    processed_lines = []
    target = rule["replace"]
    canonical = rule["cannonical"]

    for line in lines:
        processed_lines.append(line.replace(target, canonical))

    return processed_lines


def normalize_fee_guide(fee_guide_lines: List[str], config: List[Dict]) -> List[str]:
    """
    Orchestrates the normalization "passes" based on the rules in config.
    """
    current_lines = list(fee_guide_lines)

    for rule in config:
        strategy = rule.get("strategy")

        if strategy == "merge_fragment_with_next":
            current_lines = _run_merge_strategy(current_lines, rule)

        elif strategy == "append_fragment_to_prev":
            current_lines = _run_append_strategy(current_lines, rule)

        elif strategy == "join_separated":
            current_lines = _run_join_separated_strategy(current_lines, rule)

        elif strategy == "standardize":
            current_lines = _run_standardize_strategy(current_lines, rule)

        else:
            print(f"Warning: Unknown strategy, '{strategy}'")

    return current_lines
