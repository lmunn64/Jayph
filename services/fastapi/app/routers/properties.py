""" 
Router module for fetching property details

Includes router endpoints for:

    /properties - Return all validated properties as List[Property] from test_json file
            /{uuid}/reviews - Return all validated reviews of a given property by its uuid as List[Reviews] from test_json file
            /{uuid}/images - Return all validated images of a given property by its uuid as List[Image] from test_json file

    /api-properties - Fetch /property from Hospitable API and return validated properties as List[Property]
                /{uuid}/reviews - Return all validated reviews of a given property by its uuid as List[Reviews] from external Hospitable API
                /{uuid}/images - Return all validated images of a given property by its uuid as List[Image] from external Hospitable API
"""

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
from app.caches.properties_cache import properties_cache
from app.modules.date import format_date
from app.modules.image_link_enlarger import get_enlarged_URL

'''base path for .env'''
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=env_path)

'''Environment personal access token value for Hospitable API'''
PAT = os.getenv("PAT")

router = APIRouter()

'''Base directory and test_json path'''
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
test_json_path = os.path.join(BASE_DIR, 'test_json', 'phony_properties.json')

"""

Non External API property endpoints

"""
@router.get('/properties', response_model=List[Property], tags=['properties'])
def get_properties():
    """
    Returns all validated properties as a list of Property objects from the local test_json file.

    - Response: List[Property]
    - Errors:
        - 404: If the test_json file is missing or empty.
        - 409: If the data format is invalid.
    """
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
            picture_url = get_enlarged_URL(item.get('picture')),
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

@router.get('/properties/{uuid}/images', response_model=List[Image], tags=['properties'])
def get_images(uuid: str):
    """
    Returns all validated images for a given property by its UUID from the local test_json file.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Image]
    - Errors:
        - 404: If the image file is missing.
        - 409: If the data format is invalid.
    """
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

@router.get('/properties/{uuid}/reviews', response_model=List[Review], tags=['properties'])
def get_reviews(uuid: str):
    """
    Returns all validated reviews for a given property by its UUID from the local test_json file.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Review]
    - Errors:
        - 404: If the review file is missing.
        - 409: If the data format is invalid.
    """
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
            name= "Luke Munn",
            img_src= "",
            date= format_date(item.get('reviewed_at')),
            review_content= item.get('public').get('review'),
            rating= item.get('public').get('rating'),
            platform= item.get('platform')
        ) for item in content.get('data')]
    except ValidationError as e:
        print(e)
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    except AttributeError as e:
        raise HTTPException(status_code=409, detail='Validation error: External API has returned unexpected response format')
    return reviews

"""

External API property endpoints

"""
@router.get('/api_properties', response_model=List[Property], tags=['hospitable properties'])
def get_properties():
    """
    Fetches and returns all validated properties from the external Hospitable API.

    - Response: List[Property]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
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
            picture_url = get_enlarged_URL(item.get('picture')),
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

@router.get('/api_properties/{uuid}/images', response_model=List[Image], tags=['hospitable properties'])
def get_images(uuid: str):
    """
    Fetches and returns all validated images for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Image]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
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

@router.get('/api_properties/{uuid}/reviews', response_model=List[Review], tags=['hospitable properties'])
def get_reviews(uuid: str):
    """
    Fetches and returns all validated reviews for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Review]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
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