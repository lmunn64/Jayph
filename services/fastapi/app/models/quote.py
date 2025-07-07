from pydantic import BaseModel

class Guests(BaseModel):
    adults: int
    children: int
    infants: int
    pets: int
    
class Guest_Details(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str

'''Quote generation body mode to validate generating a quote body'''
class Quote(BaseModel):
    checkin_date: str
    checkout_date: str
    guests: Guests
    guest_details: Guest_Details
    promo_code: str | None
    
