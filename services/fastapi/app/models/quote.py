from pydantic import BaseModel
from typing import Optional

class Guests(BaseModel):
    adults: int
    children: int
    infants: int
    pets: int

'''Quote generation body mode to validate generating a quote body'''
class Quote(BaseModel):
    checkin_date: str
    checkout_date: str
    guests: Guests
    promo_code: Optional[str] = None

class Fee(BaseModel):
    amount: int
    formatted: str
    label: str
    category: str

class Discount(Fee):
    pass

class Quote_Response(BaseModel):
    quote_id: str
    booking_url: str
    fees: list[Fee]
    discounts: list[Discount]
    total_before_tax: str
    

    
