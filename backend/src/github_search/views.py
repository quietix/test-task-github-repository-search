from django.conf import settings
from django.core.cache import cache

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
)

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, APIException
from rest_framework import status

import requests
from requests.exceptions import HTTPError

from urllib.parse import urlencode
from .github_service import search_for_github_data


# 2 hours
CACHE_TIMEOUT_SECONDS = 60 * 60 * 2


@extend_schema(
    methods=["POST"],
    description="Search GitHub for users, repositories, or issues.",
    parameters=[
        OpenApiParameter(
            name="search_type",
            required=True,
            type=str,
            description="Search type: 'users', 'repositories', or 'issues'",
        ),
        OpenApiParameter(
            name="search_text", required=True, type=str, description="Search query"
        ),
    ],
    responses={200: OpenApiExample("Success", value={"items": []})},
    tags=["GitHub Search"],
)
@api_view(["POST"])
def github_search(request: Request) -> Response:
    search_type = request.query_params.get("search_type")
    search_text = request.query_params.get("search_text")

    if search_type not in settings.SUPPORTED_SEARCH_TYPES:
        raise ValidationError(
            "Invalid search_type. Must be 'user', 'repository', or 'issue'"
        )

    if not search_text:
        raise ValidationError("search_text is required.")

    cache_key = f"github_search:{search_type}:{search_text}"
    cached_result = cache.get(cache_key)

    if cached_result:
        return Response(cached_result)

    data = search_for_github_data(search_type, search_text)

    cache.set(cache_key, data, timeout=CACHE_TIMEOUT_SECONDS)

    return Response(data)


@extend_schema(
    methods=["POST"],
    description="Clear all backend cache (Redis).",
    responses={200: OpenApiExample("Cache Cleared", value={"detail": "Cache cleared"})},
    tags=["Cache"],
)
@api_view(["POST"])
def clear_cache(request: Request) -> Response:
    cache.clear()
    return Response({"detail": "Cache cleared"}, status=status.HTTP_200_OK)
