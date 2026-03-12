from enum import Enum


class FeeStrategy(str, Enum):
    # numeric strategies
    FEE = "recommended_fee"
    FEE_RANGE = "recommended_fee_range"
    no_fee = "no_fee"

    # adjudication strategies
    expense_only = "expense_only"
    IC = "independent_consideration"

    # other strategies
    MESSAGE = "instructional_message"


class ProvinceCode(str, Enum):
    AB = "AB"
    BC = "BC"
    MB = "MB"
    NB = "NB"
    NF = "NF"
    NS = "NS"
    NT = "NT"
    NU = "NU"
    ON = "ON"
    PE = "PE"
    QC = "QC"
    SK = "SK"
    YT = "YT"


class Specialty(str, Enum):
    GEN = "general_practice"
    PUB = "public_health"
    ENDO = "endodontics"
    ORTHO = "orthodontics"
    PED = "pediatrics"
    PERIO = "periodontics"
    PROS = "prosthodontics"
    OMFP = "oral_maxillofacial_pathology"
    OMFR = "oral_maxillofacial_radiology"
    OMFS = "oral_maxillofacial_surgery"
