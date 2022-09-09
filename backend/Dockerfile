FROM python:3.9

WORKDIR /app

COPY ./utils /app/utils
COPY ./main.py /app
COPY ./requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
