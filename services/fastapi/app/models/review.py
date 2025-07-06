from pydantic import BaseModel

# model for a review
class Review(BaseModel):
    id: str
    platform: str
    review: str
    rating: int


