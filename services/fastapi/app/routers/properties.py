from typing import Dict, List
import os
import json
from pydantic import ValidationError
from fastapi import APIRouter, HTTPException
from app.models.property import Property, Address, HouseRules, Capacity
from app.models.image import Image
from app.models.review import Review
import requests
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=env_path)
PAT = os.getenv("PAT")

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
test_json_path = os.path.join(BASE_DIR, 'test_json', 'phony_properties.json')

properties_cache = {
    'all_properties': None,
    'property_images' : Dict[str, List[Image]],
    'property_reviews' : Dict[str, List[Review]]
}

# When receiving actual api response, make "async def"
# GET request to get all properties as List[Property]
@router.get('/properties', response_model=List[Property])
def get_properties():
    if properties_cache.get('all_properties'):
        print('returning cached properties')
        return properties_cache.get('all_properties')
    if not os.path.exists(test_json_path):
        raise HTTPException(status_code=404, detail=test_json_path)
    if os.path.getsize(test_json_path) == 0:
        raise HTTPException(status_code=404, detail="File is empty")    
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


@router.get('/properties/{uuid}/images', response_model=List[Image])
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

@router.get('/properties/{uuid}/reviews', response_model=List[Review])
def get_reviews(uuid: str):
    if uuid in properties_cache.get('property_reviews', {}):
        print("returning cached property reviews")
        return properties_cache.get('property_reviews')[uuid]
    json_file = uuid + '.json'
    review_path = os.path.join(BASE_DIR, 'test_json', 'phony_reviews', json_file)
    if not os.path.exists(review_path):
        return {'error' : "File not found"}
    with open(review_path, encoding="utf-8") as file:
        content = json.load(file)
    try:
        reviews = [Review(
            id = item.get('id'),
            review= item.get('public').get('review'),
            rating= item.get('public').get('rating'),
            platform= item.get('platform')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    except AttributeError as e:
        raise HTTPException(status_code=409, detail='Validation error: External API has returned unexpected response format')
    return reviews

##
##
## External API versions of property endpoints
@router.get('/api_properties', response_model=List[Property])
def get_properties():
    if properties_cache.get('all_properties'):
        print('returning cached properties')
        return properties_cache.get('all_properties')
    try:
        response = requests.get('https://public.api.hospitable.com/v2/properties',
                                headers={"Authorization": f"Bearer {PAT}"})
        if response.status_code != 200:
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
    
        content = response.json()
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

@router.get('/api_properties/{uuid}/images', response_model=List[Image])
def get_images(uuid: str):
    try:
        response = requests.get(f"https://public.api.hospitable.com/v2/properties/{uuid}/images",
                                headers={"Authorization": f"Bearer {PAT}"})
        if response.status_code != 200:
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
        content = response.json()
        images = [Image(
            url = item.get('url'),
            thumbnail_url= item.get('thumbnail_url'),
            caption= item.get('caption'),
            order= item.get('order')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return images
@router.get('/api_properties/{uuid}/reviews', response_model=List[Review])
def get_reviews(uuid: str):
    try:
        response = requests.get(f"https://public.api.hospitable.com/v2/properties/{uuid}/reviews",
                                headers={"Authorization": f"Bearer {PAT}"})
        if response.status_code != 200:
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
    
        content = response.json()
        reviews = [Review(
            id = item.get('id'),
            review= item.get('public').get('review'),
            rating= item.get('public').get('rating'),
            platform= item.get('platform')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    except AttributeError as e:
        raise HTTPException(status_code=409, detail='Validation error: External API has returned unexpected response format')
    return reviews