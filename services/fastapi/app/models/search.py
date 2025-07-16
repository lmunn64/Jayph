from pydantic import BaseModel

class Property_Total(BaseModel):
    uuid: str
    total_before_taxes: str