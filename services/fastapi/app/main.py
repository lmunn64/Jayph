from typing import List, Optional, Dict
from enum import IntEnum
from pydantic import BaseModel, Field, ValidationError
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # NEW
import os
import json
from app.routers import properties
from mangum import Mangum
from fastapi.responses import FileResponse 

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://lmunn64.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(properties.router)


# # When receiving actual api response, make "async def"
# # GET request to get all properties as List[Property]
# @app.get('/properties', response_model=List[Property])
# async def get_properties():
#     if properties_cache.get('all_properties'):
#         print('returning cached properties')
#         return properties_cache.get('all_properties')
#     if not os.path.exists(test_json_path):
#         return {"error": "File not found"}
#     if os.path.getsize(test_json_path) == 0:
#         return {"error": "File is empty"}
#     with open(test_json_path) as file:
#         content = json.load(file)
#     try:
#         properties = [Property(
#             id = item.get("id"),
#             name = item.get('public_name'),
#             picture_url = item.get('picture'),
#             address = Address(**item.get('address', {})),
#             amenities = item.get('amenities'),
#             description = item.get('description'),
#             summary = item.get('summary'),
#             capacity= Capacity(**item.get('capacity', {})),
#             house_rules= HouseRules(**item.get('house_rules', {}))
#         ) for item in content.get('data')]
#         properties_cache.update({'all_properties': properties})
#     except ValidationError as e:
#         raise HTTPException(status_code = 409, detail = 'Validation error: External API has returned unexpected response format')
#     return properties

# @app.get('/properties/{uuid}/images', response_model=List[Image])
# async def get_images(uuid: str):
#     if uuid in properties_cache.get('property_images', {}):
#         print("returning cached image properties")
#         return properties_cache.get('property_images')[uuid]
#     json_file = uuid + '.json'
#     image_path = os.path.join(BASE_DIR, 'test_json', 'phony_images', json_file)
#     if not os.path.exists(image_path):
#         return {'error' : "File not found"}
#     with open(image_path) as file:
#         content = json.load(file)

#     try:
#         images = [Image(
#             url = item.get('url'),
#             thumbnail_url= item.get('thumbnail_url'),
#             caption= item.get('caption'),
#             order= item.get('order')
#         ) for item in content.get('data')]
#     except ValidationError as e:
#         raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
#     return images

# @app.get('/properties/{uuid}/reviews', response_model=List[Review])
# @lru_cache
# async def get_images(uuid: str):
#     if uuid in properties_cache.get('property_reviews', {}):
#         print("returning cached property reviews")
#         return properties_cache.get('property_reviews')[uuid]
#     json_file = uuid + '.json'
#     review_path = os.path.join(BASE_DIR, 'test_json', 'phony_reviews', json_file)
#     if not os.path.exists(review_path):
#         return {'error' : "File not found"}
#     with open(review_path) as file:
#         content = json.load(file)
#     try:
#         images = [Review(
#             id = item.get('id'),
#             review= item.get('public').get('review'),
#             rating= item.get('public').get('rating'),
#             platform= item.get('platform')
#         ) for item in content.get('data')]
#     except ValidationError as e:
#         raise HTTPException(status_code=409, detail ='Validation error: External API has returned unexpected response format')
