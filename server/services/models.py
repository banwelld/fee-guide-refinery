from __future__ import (
    annotations,  # postpone type-hint evaluation until classes are built
)

from typing import List, Union

from pydantic import BaseModel, Field

# using pydantic to validate category and procedure models


class Procedure(BaseModel):
    code: str
    name: str
    fee_strategy: str
    fee_min_cents: int = 0
    fee_max_cents: int = 0
    has_L_flag: bool = False
    has_E_flag: bool = False
    has_PS_FLAG: bool = False
    message: Union[str, None] = None
    notes: Union[str, None] = None


class Category(BaseModel):
    code: str
    name: Union[str, None] = None
    has_PS_flag: bool = False
    notes: Union[str, None] = None
    children: List[Union["Category", "Procedure"]] = Field(default_factory=list)


# support self-referencing and recursive types
if hasattr(Category, "update_forward_refs"):
    Category.update_forward_refs()
elif hasattr(Category, "model_rebuild"):
    Category.model_rebuild()
