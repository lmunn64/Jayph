from pydantic import BaseModel

class Image(BaseModel):
    url: str
    thumbnail_url: str
    caption: str
    order: int
