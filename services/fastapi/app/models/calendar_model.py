from pydantic import BaseModel
from typing import List, Optional

'''Model for a properties availability and details for a specific date'''
class Date(BaseModel):
    date: str
    day: str
    min_stay: int
    closed_for_checkin: bool
    closed_for_checkout: bool
    status: str
    available: bool

'''Model for a calendar with start and end date along with a list of Date objs'''
class Calendar(BaseModel):
    listing_id: str
    provider: str
    start_date: str
    end_date: str
    dates: List[Date]
    
