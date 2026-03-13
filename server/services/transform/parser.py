import re
from typing import Any, Dict, List, Union

from services.models import Category, Procedure
from services.utils.constants import FEE, FEE_RANGE


def _check_string_match(text: str, target: str) -> bool:
    """
    Abstracted check that simply looks for a target string inside a text.
    """
    if not target:
        return False
    return target in text


def _clean_and_collapse_whitespace(text: str) -> str:
    """
    Joins words back together with a single space and strips the result.
    """
    return " ".join(text.split()).strip()


def _bundle_lines(clean_lines: List[str]) -> List[List[str]]:
    """
    Groups the raw lines into bundles following the 5-digit code prefix.
    """
    bundled_items = []
    current_bundle = []

    for line in clean_lines:
        first_5 = line[0:5].strip()
        if len(first_5) == 5 and first_5.isdecimal():
            if current_bundle:
                bundled_items.append(current_bundle)
            current_bundle = [line]
        else:
            if current_bundle:
                current_bundle.append(line)

    if current_bundle:
        bundled_items.append(current_bundle)

    return bundled_items


def _parse_category(
    bundle: List[str], code: str, expense_patterns: Dict, base_info: Dict
) -> Category:
    """
    Handles category parsing: concatenates description and looks for the PS flag.
    """
    full_text = " ".join(bundle)
    remaining_text = full_text.replace(code, "", 1)

    ps_flag = expense_patterns.get("PS")
    has_PS = False

    # Check for the PS flag after concatenation
    if _check_string_match(remaining_text, ps_flag):
        has_PS = True
        remaining_text = remaining_text.replace(ps_flag, "")

    final_name = _clean_and_collapse_whitespace(remaining_text)

    return Category(
        **base_info,
        code=code,
        name=final_name,
        has_PS_flag=has_PS,
        original_lines=bundle,
    )


def _parse_procedure(
    bundle: List[str],
    code: str,
    strategy: str,
    fee_data: Dict,
    expense_patterns: Dict,
    base_info: Dict,
) -> Procedure:
    """
    The Stepmother: Delegates all the hard work to others and just
    assembles the results.
    """
    full_text = " ".join(bundle)
    remaining_text = full_text.replace(code, "", 1)

    # 1. Expunge the fee artifacts detected earlier
    remaining_text = remaining_text.replace(fee_data["raw_match"], "")

    # 2. Handle the Expense Flags
    l_flag = expense_patterns.get("L")
    e_flag = expense_patterns.get("E")

    has_L = False
    has_E = False

    # Check for the flags
    if _check_string_match(remaining_text, l_flag):
        has_L = True
        remaining_text = remaining_text.replace(l_flag, "")

    if _check_string_match(remaining_text, e_flag):
        has_E = True
        remaining_text = remaining_text.replace(e_flag, "")

    # Expunge any leftover "and/or" joiners between flags
    if "and/or" in remaining_text:
        remaining_text = remaining_text.replace("and/or", "")

    # 3. Final Polish
    final_name = _clean_and_collapse_whitespace(remaining_text)

    return Procedure(
        **base_info,
        code=code,
        name=final_name,
        fee_strategy=strategy,
        fee_min_cents=fee_data["min"],
        fee_max_cents=fee_data["max"],
        has_L_flag=has_L,
        has_E_flag=has_E,
        original_lines=bundle,
    )


def _get_fee_strategy_data(text: str, strategy_patterns: Dict) -> Dict:
    """
    Detective function that searches for the correct fee strategy.
    """
    # Check for Range first ($X to $Y)
    range_match = re.search(FEE_RANGE, text)
    if range_match:
        val1 = range_match.group(1).replace(",", "")
        val2 = range_match.group(2).replace(",", "")
        return {
            "strategy": "RANGE",
            "min": int(float(val1) * 100),
            "max": int(float(val2) * 100),
            "raw_match": range_match.group(0),
        }

    # Check for Single Fee ($X)
    fee_match = re.search(FEE, text)
    if fee_match:
        val = fee_match.group(1).replace(",", "")
        return {
            "strategy": "SINGLE",
            "min": int(float(val) * 100),
            "max": int(float(val) * 100),
            "raw_match": fee_match.group(0),
        }

    # Check for IC
    ic_str = strategy_patterns.get("IC")
    if _check_string_match(text, ic_str):
        return {"strategy": "IC", "min": 0, "max": 0, "raw_match": ic_str}

    # Check for NO FEE
    nf_str = strategy_patterns.get("no_fee")
    if _check_string_match(text, nf_str):
        return {"strategy": "NO FEE", "min": 0, "max": 0, "raw_match": nf_str}

    return None


def transform_lines_to_models(
    clean_lines: List[str],
    config: Dict[str, Any],
    province: str,
    specialty: str,
    year: str,
) -> List[Union[Category, Procedure]]:
    """
    Dad: The orchestrator. Orchestrates bundling and delegates
    the parsing to Procedures or Categories.
    """
    base_info = {"province_code": province, "specialty": specialty, "year": year}
    formatting = config.get("formatting", {})
    expense_patterns = formatting.get("expenses", {})
    strategy_patterns = formatting.get("fee_strategy", {})

    # Step 1: Delegate bundling
    bundles = _bundle_lines(clean_lines)

    final_records = []

    for bundle in bundles:
        code = bundle[0][0:5]
        full_text = " ".join(bundle)
        remaining_text = full_text.replace(code, "", 1)

        # Step 2: Delegate strategy detection
        fee_data = _get_fee_strategy_data(remaining_text, strategy_patterns)

        # Step 3: Delegate the actual parsing based on what we found
        if fee_data:
            record = _parse_procedure(
                bundle,
                code,
                fee_data["strategy"],
                fee_data,
                expense_patterns,
                base_info,
            )
        else:
            record = _parse_category(bundle, code, expense_patterns, base_info)

        final_records.append(record)

    return final_records
