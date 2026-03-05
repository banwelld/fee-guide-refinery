from enum import Enum


class FeeStrategy(str, Enum):
    # numeric strategies
    FEE = "recommended_fee"
    FEE_RANGE = "recommended_fee_range"
    NO_FEE = "no_fee"

    # adjudication strategies
    BILL_AS_LAB = "bill_as_lab"
    IC = "independent_consideration"

    # other strategies
    MESSAGE = "instructional_message"
