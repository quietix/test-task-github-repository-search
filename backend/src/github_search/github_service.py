import requests
from requests.exceptions import HTTPError 
from django.conf import settings


GITHUB_BASE_API_URL = getattr(settings, "GITHUB_BASE_API_URL", None)
if not GITHUB_BASE_API_URL:
    raise APIException("Failed to retrieve GitHub API url")


def search_for_github_data(search_type: str, query: str):
    url = f"{GITHUB_BASE_API_URL}/search/{search_type}?q={query}"

    try:
        response = requests.get(url)
        response.raise_for_status()
    except HTTPError as e:
        raise APIException(f"Failed to fetch users. {e}")

    return response.json()
