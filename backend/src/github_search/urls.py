from django.urls import path
from github_search.views import index


urlpatterns = [
    path("", index, name="index"),
]
