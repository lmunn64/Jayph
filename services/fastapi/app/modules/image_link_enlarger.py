
"""
Module to manipulate the image source links for property thumbnails

Includes: 
    - vrbo_enlarger: Removes the second-to-last segment from a VRBO image URL split by '.' to enlarge the image.
    - muscache_enlarger: Removes query parameters from the last segment of a Muscache (Airbnb) image URL to enlarge the image.
    - find_provider: Determines the image provider (VRBO, Muscache) based on the URL.
    - get_enlarged_URL: Returns an enlarged image URL for supported providers, or the original if not recognized.
    """

def vrbo_enlarger(link_list : list[str]):
    "https://media.vrbo.com/lodging/84000000/83370000/83368200/83368194/ecd8f676.c9.jpg"
    link_list.remove(link_list[-2])
    return ".".join(link_list)

def muscache_enlarger(link_list : list[str]):
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjQ1NzQ3ODM0MTAwNzk5MjIy/original/8f9a7820-cbb2-4a54-89fb-49db5f3ca779.jpeg?aki_policy=small"
    link_sans = link_list[-1].split('?')
    link_list.remove(link_list[-1])
    link_list.append(link_sans[0])
    return ".".join(link_list)


def find_provider(link_list : list[str]):
    if link_list.count("vrbo") > 0:
        return 1
    elif link_list.count("muscache") > 0:
        return 0
    return -1

def get_enlarged_URL(link : str):
    link_list = link.split(".")
    link_bool = find_provider(link_list)
    if link_bool > 0: 
        return vrbo_enlarger(link_list)
    elif link_bool < 0:
        return link
    return muscache_enlarger(link_list)

