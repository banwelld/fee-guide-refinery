from __future__ import (
    annotations,  # postpone type-hint evaluation until classes are built
)

import datetime
from typing import List

from pydantic import BaseModel, Field, model_validator

from services.utils.enums import ProvinceCode, Specialty


class FeeGuide(BaseModel):
    province_code: ProvinceCode
    specialty: Specialty
    year: str

    @model_validator(mode="after")
    def check_future_year(self):
        max_allowed_year = datetime.date.today().year + 1
        if int(self.year) > max_allowed_year:
            raise ValueError(f"{self.year} fee guides are not yet available.")
        return self


class ScheduleItem(FeeGuide):
    code: str
    name: str = "UNNAMED_ITEM"
    parent_category: str = "UNASSIGNED"
    has_PS_flag: bool = False
    notes: List[str] = Field(default_factory=list)
    original_lines: List[str] = Field(default_factory=list)


class Procedure(ScheduleItem):
    name: str = "UNNAMED_PROCEDURE"
    fee_strategy: str = "NO_STRATEGY_ASSIGNED"
    fee_min_cents: int = 0
    fee_max_cents: int = 0
    has_L_flag: bool = False
    has_E_flag: bool = False

    def info_dump(self):
        print("\n{'=' * 40}")
        print(f"CODE:{' ' * 10}{self.code}".center(40))
        print("-" * 40)
        print(f"NAME:{' ' * 10}{self.name}".center(40))
        print("-" * 40)
        print(f"CATEGORY:{' ' * 10}{self.parent_category}".center(40))
        print("-" * 40)
        print(f"FEE STRATEGY:{' ' * 10}{self.fee_strategy}".center(40))
        print("-" * 40)
        print(
            f"MIN FEE:{' ' * 4}$ {self.fee_min_cents / 100}{' ' * 8}MIN FEE:{' ' * 4}$ {self.fee_min_cents / 100}".center(
                40
            )
        )
        print("=" * 40)

    @model_validator(mode="after")
    def no_negative_min_fee(self):
        if self.fee_min_cents < 0:
            raise ValueError("Minimum fee cannot be negative integer.")
        return self

    @model_validator(mode="after")
    def no_negative_max_fee(self):
        if self.fee_max_cents < 0:
            raise ValueError("Maximum fee cannot be negative integer.")
        return self

    @model_validator(mode="after")
    def check_fee_range(self):
        if self.fee_min_cents > self.fee_max_cents:
            raise ValueError("Minimum fee cannot be greater than maximum fee")
        return self

    # recursively defined types would go here

    pass


# support self-referencing and recursive types if needed in future
