from typing import Optional
from pydantic import BaseModel

# model for a review
class Review(BaseModel):
    id: str
    name: str
    img_src: str | None
    platform: str
    review_content: Optional[str]
    rating: float
    date: str



