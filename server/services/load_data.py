from typing import List

from config import db
from models import FeeGuide, FeeGuideItem, ScheduleItem

from services.models import Procedure as ProcedureModel


def _get_or_create_schedule_item(
    proc: ProcedureModel, province: str
) -> (ScheduleItem, bool):
    """
    Retrieves or creates a ScheduleItem.
    Updates province tracking for province-specific codes.
    Returns the schedule item and whether it's province-specific.
    """
    schedule_item = ScheduleItem.query.filter_by(code=proc.code).first()
    is_prov_spec = False

    if not schedule_item:
        # Code not in master list or any previous guide
        # Derive category for province-specific codes
        category_code = f"{proc.code[0]}0000" if proc.code else "00000"

        schedule_item = ScheduleItem(
            name=proc.name,
            code=proc.code,
            is_master=False,
            provinces=province,
            parent_category=category_code,
        )
        db.session.add(schedule_item)
        db.session.flush()
        is_prov_spec = True
    else:
        if not schedule_item.is_master:
            is_prov_spec = True
            # Update category if missing for existing province-specific item
            if not schedule_item.parent_category:
                schedule_item.parent_category = (
                    f"{proc.code[0]}0000" if proc.code else "00000"
                )

            # If it's a province-specific code, track this province
            current_provinces = [
                p.strip() for p in schedule_item.provinces.split(",") if p.strip()
            ]
            if province not in current_provinces:
                current_provinces.append(province)
                schedule_item.provinces = ", ".join(current_provinces)

        proc.parent_category = schedule_item.parent_category or "UNASSIGNED"

    return schedule_item, is_prov_spec


def _get_or_create_fee_guide_item(
    fee_guide: FeeGuide,
    schedule_item: ScheduleItem,
    proc: ProcedureModel,
    is_prov_spec: bool,
    user_id: int,
) -> FeeGuideItem:
    """
    Creates a FeeGuideItem if it doesn't already exist for the guide and item combo.
    """
    fgi = FeeGuideItem.query.filter_by(
        fee_guide_id=fee_guide.id, schedule_item_id=schedule_item.id
    ).first()

    if not fgi:
        fgi = FeeGuideItem(
            fee_min_cents=proc.fee_min_cents,
            fee_max_cents=proc.fee_max_cents,
            fee_strategy=proc.fee_strategy,
            has_L_flag=proc.has_L_flag,
            has_E_flag=proc.has_E_flag,
            has_PS_flag=proc.has_PS_flag,
            is_province_specific=is_prov_spec,
            parent_category=schedule_item.parent_category,
            fee_guide_id=fee_guide.id,
            schedule_item_id=schedule_item.id,
            updated_by=user_id,
        )
        db.session.add(fgi)

    return fgi


def load_procedures_into_db(
    fee_guide: FeeGuide,
    procedures: List[ProcedureModel],
    user_id: int,
) -> FeeGuide:
    """
    Orchestrates the loading of parsed procedures into the database.
    """

    for proc in procedures:
        schedule_item, is_prov_spec = _get_or_create_schedule_item(
            proc, fee_guide.province_code
        )
        _get_or_create_fee_guide_item(
            fee_guide, schedule_item, proc, is_prov_spec, user_id
        )

    db.session.commit()
    return fee_guide
