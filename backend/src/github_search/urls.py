from django.urls import path
from github_search.views import github_search, clear_cache


urlpatterns = [
    path("search/", github_search, name="github-search"),
    path("clear-cache/", clear_cache, name="clear-cache"),
]
