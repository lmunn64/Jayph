from typing import List, Optional, Dict
from enum import IntEnum
from pydantic import BaseModel, Field, ValidationError
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # NEW
import os
import json

from fastapi.responses import FileResponse 
app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
test_json_path = os.path.join(BASE_DIR, 'test_json', 'phony_properties.json')

# model for a review
class Review(BaseModel):
    id: str
    platform: str
    review: str
    rating: int

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

class Image(BaseModel):
    url: str
    thumbnail_url: str
    caption: str
    order: int

properties_cache = {
    'all_properties': None,
    'property_images' : Dict[str, List[Image]],
    'property_reviews' : Dict[str, List[Review]]
}

# NEW
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# When receiving actual api response, make "async def"
# GET request to get all properties as List[Property]
@app.get('/properties', response_model=List[Property])
def get_properties():
    if properties_cache.get('all_properties'):
        print('returning cached properties')
        return properties_cache.get('all_properties')
    if not os.path.exists(test_json_path):
        return {"error": "File not found"}
    if os.path.getsize(test_json_path) == 0:
        return {"error": "File is empty"}
    with open(test_json_path) as file:
        content = json.load(file)
    try:
        properties = [Property(
            id = item.get("id"),
            name = item.get('public_name'),
            picture_url = item.get('picture'),
            address = Address(**item.get('address', {})),
            amenities = item.get('amenities'),
            description = item.get('description'),
            summary = item.get('summary'),
            capacity= Capacity(**item.get('capacity', {})),
            house_rules= HouseRules(**item.get('house_rules', {}))
        ) for item in content.get('data')]
        properties_cache.update({'all_properties': properties})
    except ValidationError as e:
        raise HTTPException(status_code = 409, detail = 'Validation error: External API has returned unexpected response format')
    return properties

@app.get('/properties/{uuid}/images', response_model=List[Image])
def get_images(uuid: str):
    if uuid in properties_cache.get('property_images', {}):
        print("returning cached image properties")
        return properties_cache.get('property_images')[uuid]
    json_file = uuid + '.json'
    image_path = os.path.join(BASE_DIR, 'test_json', 'phony_images', json_file)
    if not os.path.exists(image_path):
        return {'error' : "File not found"}
    with open(image_path) as file:
        content = json.load(file)

    try:
        images = [Image(
            url = item.get('url'),
            thumbnail_url= item.get('thumbnail_url'),
            caption= item.get('caption'),
            order= item.get('order')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return images

@app.get('/properties/{uuid}/reviews', response_model=List[Review])
def get_images(uuid: str):
    if uuid in properties_cache.get('property_reviews', {}):
        print("returning cached property reviews")
        return properties_cache.get('property_reviews')[uuid]
    json_file = uuid + '.json'
    review_path = os.path.join(BASE_DIR, 'test_json', 'phony_reviews', json_file)
    if not os.path.exists(review_path):
        return {'error' : "File not found"}
    with open(review_path) as file:
        content = json.load(file)
    try:
        images = [Review(
            id = item.get('id'),
            review= item.get('public').get('review'),
            rating= item.get('public').get('rating'),
            platform= item.get('platform')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return images
