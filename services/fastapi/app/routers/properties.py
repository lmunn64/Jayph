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
from datetime import date
from typing import Dict, List, Optional
import os
import json
import time

from dateutil.relativedelta import relativedelta
import requests
from dotenv import load_dotenv
from pydantic import ValidationError
from fastapi import APIRouter, HTTPException, Query

# Model Imports
from app.models.property import Property, Address, HouseRules, Capacity, Details
from app.models.image import Image
from app.models.review import Review
from app.models.calendar_model import Calendar, Date
from app.models.quote import Quote, Quote_Response, Fee, Discount

# Method Imports
from app.caches.properties_cache import properties_cache
from app.modules.date import format_date_ISO
from app.modules.image_link_enlarger import get_enlarged_URL
from app.models.search import Property_Total

## time to live for reviews and images
CACHE_TTL = 60 * 60

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
            house_rules= HouseRules(**item.get('house_rules', {})),
            details= Details(**item.get('details'))
        ) for item in content.get('data')
        if item.get('listed') is True]
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
            name= item.get('guest').get('first_name') + " " + item.get('guest').get('last_name'),
            img_src= "",
            date= format_date_ISO(item.get('reviewed_at')),
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
async def get_properties():
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
        response = requests.get('https://public.api.hospitable.com/v2/properties?include=details',
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
            house_rules= HouseRules(**item.get('house_rules', {})),
            details= Details(**item.get('details'))
        ) for item in content.get('data')
        if item.get('listed') is True]
        properties_cache.update({'all_properties': properties})
    except ValidationError as e:
        raise HTTPException(status_code = 409, detail = 'Validation error: External API has returned unexpected response format')
    return properties

@router.get('/api_properties/{uuid}/images', response_model=List[Image], tags=['hospitable properties'])
async def get_images(uuid: str):
    """
    Fetches and returns all validated images for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Image]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
    now = time.time()
    last_updated = properties_cache['property_images_last_updated'].get(uuid)
    if(uuid in properties_cache.get('property_images', {}) and last_updated and (now - last_updated < CACHE_TTL)):
        print('returning ${uuid} cached images')
        return properties_cache['property_images'][uuid]
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
    properties_cache['property_images'][uuid] = images
    properties_cache['property_images_last_updated'][uuid] = now
    return images

@router.get('/api_properties/{uuid}/reviews', response_model=List[Review], tags=['hospitable properties'])
async def get_reviews(uuid: str):
    """
    Fetches and returns all validated reviews for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Response: List[Review]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
    now = time.time()
    last_updated = properties_cache['property_reviews_last_updated'].get(uuid)
    if(uuid in properties_cache.get('property_reviews', {}) and last_updated and (now - last_updated < CACHE_TTL)):
        print('returning ${uuid} cached reviews')
        return properties_cache['property_reviews'][uuid]
    try:
        response = requests.get(f"https://public.api.hospitable.com/v2/properties/{uuid}/reviews?include=guest",
                                headers={"Authorization": f"Bearer {PAT}"})
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
    
        content = response.json()
        reviews = [Review(
            id = item.get('id'),
            name= item.get('guest').get('first_name') + " " + item.get('guest').get('last_name'),
            img_src= "",
            date= format_date_ISO(item.get('reviewed_at')),
            review_content= item.get('public').get('review'),
            rating= item.get('public').get('rating'),
            platform= item.get('platform')
        ) for item in content.get('data')]
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    except AttributeError as e:
        raise HTTPException(status_code=409, detail='Attribute Error: External API has returned unexpected response format')
    properties_cache['property_reviews'][uuid] = reviews
    properties_cache['property_reviews_last_updated'][uuid] = now
    return reviews

@router.get('/api_properties/{uuid}/calendar', response_model=Calendar, tags=['hospitable properties'])
async def get_calendar(uuid : str, start_date : Optional[str] = Query(None), end_date : Optional[str] = Query(None)):
    """
    Fetches and returns the calendar availability for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Query params:
        - start_date (str, optional): The start date for the calendar range (default: today).
        - end_date (str, optional): The end date for the calendar range (default: 4 months from today).
    - Response: Calendar
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
     # Set defaults if not provided
    if start_date is None:
        start_date = str(date.today())
    if end_date is None:
        end_date = str(date.today() + relativedelta(months=+4))
    try:
        cal_params = {
            'start_date' : start_date,
            'end_date' : end_date
        }
        response = requests.get(f"https://public.api.hospitable.com/v2/properties/{uuid}/calendar",
                                headers={"Authorization": f"Bearer {PAT}"},
                                params=cal_params)
        if response.status_code != 200:
            print(response.status_code + ": " + response.reason_phrase)
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
        content = response.json()
        data = content.get('data')
        # Get and set dates from data json
        dates = [Date(
            date = item.get('date'),
            day = item.get('day'),
            min_stay = item.get('min_stay'),
            closed_for_checkin = item.get('closed_for_checkin'),
            closed_for_checkout = item.get('closed_for_checkout'),
            status = item.get('status').get('reason'),
            available = item.get('status').get('available')
        ) for item in data.get('days')]
        # Get and set calendar data from data json
        calendar = Calendar(
            listing_id = data.get('listing_id'),
            provider = data.get('provider'),
            start_date = data.get('start_date'),
            end_date = data.get('end_date'),
            dates = dates
        )
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return calendar

@router.post('/api_properties/{uuid}/quote', tags=['hospitable properties'])
async def gen_quote(uuid : str, item: Quote):
    """
    Generates and returns a validated quote for a given property by its UUID from the external Hospitable API.

    - Path param: uuid (str) - The property UUID.
    - Request body: Quote - The quote request details including dates, guests, and guest details.
    - Response: Quote_Response
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
    try: 
        quote = item.model_dump(exclude_none=True)
        print(item)
        response = requests.post(f"https://public.api.hospitable.com/v2/properties/{uuid}/quote",
            headers={"Authorization": f"Bearer {PAT}"},
            json=quote)
        if response.status_code != 200:
            json = response.json()
            raise HTTPException(status_code =  response.status_code, detail = json.get('reason_phrase'))
        content = response.json()
        data = content.get("data")
        quote_response = Quote_Response(
            quote_id= data.get("quote_id"),
            booking_url= data.get("booking_url"),
            sub_total = data.get("financials").get("totals").get("sub_total").get("formatted"),
            fees = [Fee(**fee) for fee in data.get("financials").get("fees")],
            discounts= [Discount(**disc) for disc in data.get("financials").get("discounts")],
            total_before_tax= data.get("financials").get("totals").get("total_without_taxes").get("formatted")
        )
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return quote_response

@router.get('/api_properties/search', response_model= list[Property_Total], tags=['hospitable properties'])
async def search_properties(adults: int, start_date: str, end_date: str, children : Optional[int] = None, infants : Optional[int] = None, pets : Optional[int] = None, location : Optional[str] = None):
    """
    Searches and returns all available properties with pricing for given criteria from the external Hospitable API.

    - Query params:
        - adults (int): Number of adult guests (required).
        - start_date (str): Check-in date in YYYY-MM-DD format (required).
        - end_date (str): Check-out date in YYYY-MM-DD format (required).
        - children (int, optional): Number of children guests.
        - infants (int, optional): Number of infant guests.
        - pets (int, optional): Number of pets.
        - location (str, optional): City name to filter properties by location.
    - Response: List[Property_Total]
    - Errors:
        - 401: If the external API call is forbidden.
        - 409: If the data format is invalid.
    """
    try:
        search_params = {
            'start_date' : start_date,
            'end_date' : end_date,
            'adults': adults,
            'children': children,
            'infants': infants,
            'pets' : pets
        }

        # remove None values
        search_params = {k: v for k, v in search_params.items() if v is not None}

        # call search
        response = requests.get(f"https://public.api.hospitable.com/v2/properties/search",
                                headers={"Authorization": f"Bearer {PAT}"},
                                params=search_params)
        if response.status_code != 200:
            print(response.status_code + ": " + response.reason_phrase)
            raise HTTPException(status_code = 401, detail = 'Forbidden call to external API')
        content = response.json()
        data = content.get("data")
        search_results =[Property_Total(
            uuid= item.get("property").get("id"),
            total_before_taxes= item.get("pricing").get("total_without_taxes").get("formatted_string")
        ) for item in data 
        if item.get("availability").get("available") is True and 
        (location is None or item.get("property").get("address").get("city") == location)] 
    except ValidationError as e:
        raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
    return search_results
