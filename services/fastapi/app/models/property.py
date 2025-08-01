from pydantic import BaseModel
from typing import List, Optional

# model for the address of a listing
class Coordinates(BaseModel):
    city: str
    state: str
    latitude: str
    longitude: str

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

# model for details of the house
class Details(BaseModel):
    space_overview: str | None
    guest_access: str | None
    other_details: str | None
    neighborhood_description: str | None
    getting_around: str | None
    
# base listing model
class Property(BaseModel):
    id: str
    name: str
    picture_url: str
    coordinates: Coordinates
    amenities: List[str]
    description: str
    summary: str
    capacity: Capacity
    house_rules: HouseRules
    details: Details