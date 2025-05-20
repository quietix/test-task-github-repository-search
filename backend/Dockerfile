FROM python:3.13.2-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

WORKDIR /app/src
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi"]
