from __future__ import (
    annotations,  # postpone type-hint evaluation until classes are built
)

from typing import List, Union

from pydantic import BaseModel, Field

# using pydantic to validate category and procedure models


class FeeGuideEntry(BaseModel):
    code: str
    name: str = "UNNAMED_ENTRY"
    has_PS_flag: bool = False
    notes: list[str] = Field(default_factory=list)
    original_lines: list[str] = Field(default_factory=list)

    def concatenate_lines(self, is_first_two_only: bool = True):
        """
        **Description:**
        Merges lines in the original_lines list and collapses the items.

        **Arguments:**
        *is_first_two_only* (bool):
            True: Concatenate first 2 lines and collapse them into index 0
            False: Concatenate all lines into a single string at index 0
        """
        if not self.original_lines:
            return

        if is_first_two_only and len(self.original_lines) >= 2:
            self.original_lines[0:2] = [" ".join(self.original_lines[0:2])]
        elif not is_first_two_only:
            self.original_lines = [" ".join(self.original_lines)]


class Procedure(FeeGuideEntry):
    name: str = "UNNAMED_PROCEDURE"
    fee_strategy: str = "NO_STRATEGY_ASSIGNED"
    fee_min_cents: int = 0
    fee_max_cents: int = 0
    has_L_flag: bool = False
    has_E_flag: bool = False


class Category(FeeGuideEntry):
    name: str = "UNNAMED_CATEGORY"
    children: List[Union["Category", "Procedure"]] = Field(default_factory=list)


# support self-referencing and recursive types
if hasattr(Category, "update_forward_refs"):
    Category.update_forward_refs()
elif hasattr(Category, "model_rebuild"):
    Category.model_rebuild()
