import pytest
from typing import Optional
from enum import StrEnum
from urllib.parse import urlencode

from django.core.cache import cache
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


class SearchTypeEnum(StrEnum):
    USER = "users"
    REPOSITORY = "repositories"
    ISSUE = "issues"


@pytest.mark.django_db
class TestGithubSearchAPI:

    @pytest.fixture(autouse=True)
    def setup(self):
        cache.clear()

    @pytest.fixture
    def client(self):
        return APIClient()

    @pytest.fixture
    def search_url(self):
        return reverse("github-search")

    def build_query_string(
        self,
        search_url: str,
        search_type: Optional[SearchTypeEnum] = None,
        search_text: Optional[str] = None,
    ) -> str:
        params = {}
        if search_type:
            params["search_type"] = search_type
        if search_text:
            params["search_text"] = search_text
        return f"{search_url}?{urlencode(params)}"

    def test_successful_search_by_user(self, search_url, client):
        search_type = SearchTypeEnum.USER
        search_text = "dummy_user"

        url = self.build_query_string(search_url, search_type, search_text)

        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK

    def test_successful_search_by_repository(self, search_url, client):
        search_type = SearchTypeEnum.REPOSITORY
        search_text = "dummy_repository"

        url = self.build_query_string(search_url, search_type, search_text)

        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK

    def test_successful_search_by_issue(self, search_url, client):
        search_type = SearchTypeEnum.ISSUE
        search_text = "dummy_issue"

        url = self.build_query_string(search_url, search_type, search_text)

        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK

    def test_missing_search_type_returns_400(self, search_url, client):
        search_text = "dummy_user"

        url = self.build_query_string(search_url, search_text=search_text)

        response = client.post(url)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_missing_search_text_returns_400(self, search_url, client):
        search_type = SearchTypeEnum.USER

        url = self.build_query_string(search_url, search_type=search_type)

        response = client.post(url)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
