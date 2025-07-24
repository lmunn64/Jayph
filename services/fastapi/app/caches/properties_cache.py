from typing import Dict, List
from app.models.image import Image
from app.models.review import Review

properties_cache = {
    'all_properties': None,
    'property_images': {},  # type: Dict[str, List[Image]]
    'property_reviews': {},  # type: Dict[str, List[Review]]
    
    'property_reviews_last_updated': {}, # type: Dict[str, float]

    'property_images_last_updated': {}, # type: Dict[str, float]
}