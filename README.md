# Reactec - WORK IN PROGRESS

## Description
This is a WebApp that allows an authenticated to user to upload "obras" to a database. 
These "obras" are then shown to the public trough a query, that can be filtered by type.
<br>
<br>
Built with:
- [FastAPI](https://fastapi.tiangolo.com/): for the backend
- [MINIO](https://min.io/): for the storage of images 
- [ReactJS](https://reactjs.org/): for the frontend

## Start the webapp
1. docker compose up --build
2. Go to http://127.0.0.1:9090/
3. Create a user with the values from docker-compose.yml 
    - User Name = S3_ACCESS_KEY
    - Password = S3_SECRET_KEY
    - Set policy as readwrite
4. Go to http://0.0.0.0:8000/docs#/default/create_user_users__post and create an user

