from typing import Dict, List
from app.models.image import Image
from app.models.review import Review

properties_cache = {
    'all_properties': None,
    'property_images': {},  # type: Dict[str, List[Image]]
    'property_reviews': {}  # type: Dict[str, List[Review]]
}