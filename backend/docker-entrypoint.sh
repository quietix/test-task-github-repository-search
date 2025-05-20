#!/bin/bash

cd src && \
python3 ./manage.py migrate

gunicorn --bind 0.0.0.0:8000 core.wsgi
