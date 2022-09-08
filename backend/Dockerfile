FROM python:3.9

WORKDIR /app

COPY ./src /app/src
COPY ./requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
