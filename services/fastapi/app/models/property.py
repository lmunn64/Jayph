from pydantic import BaseModel
from typing import List, Optional

# model for the address of a listing
class Address(BaseModel):
    city: str
    state: str
    country: str
    postcode: str

# model for the capacity of a listing
class Capacity(BaseModel):
    max: int
    bedrooms: int
    beds: int
    bathrooms: float

# model for the rules of the house
class HouseRules(BaseModel): 
    pets_allowed: bool
    smoking_allowed: bool
    events_allowed: Optional[bool] = None

# base listing model
class Property(BaseModel):
    id: str
    name: str
    picture_url: str
    address: Address
    amenities: List[str]
    description: str
    summary: str
    capacity: Capacity
    house_rules: HouseRules