from email.policy import HTTP
from http.client import OK
import os
from typing import List
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
import uvicorn
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from utils import crud, models, schemas
from utils import environment_reader
from minio import Minio
from minio.error import S3Error
from utils.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='Reatec-Backend')

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'])

environs = environment_reader.read_environments()

minio_client = Minio(
    "172.17.0.1:9000",
    access_key=environs.s3_access,
    secret_key=environs.s3_secret,
    secure=False
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/users/', response_model=(schemas.User))
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, username=(user.username))
    if db_user:
        raise HTTPException(status_code=400, detail='Name already registered')
    return crud.create_user(db=db, user=user)


@app.get('/users/{user_id}', response_model=(schemas.User))
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return db_user


@app.get('/users/', response_model=(List[schemas.User]))
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.post('/users/login', status_code=200)
def login_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.verifyPwd(db, user)
    print(db_user)
    if db_user is None:
        raise HTTPException(status_code=403, detail='Not Authorized')
    return user.username


@app.post('/obras/create-obra', response_model=(schemas.Obra))
def create_obra(obra: schemas.ObraBase, db: Session = Depends(get_db)):
    db_obra = crud.get_obra_by_name(
        db, name=(obra.nameDisplayed.replace(' ', '_')))
    print(db_obra)
    if db_obra:
        raise HTTPException(status_code=400, detail='Obra already registered')
    return crud.create_obra(db=db, obra=obra)

@app.delete('/obras/delete/{id}', status_code=204)
def delete_obra(id: int, db: Session = Depends(get_db)):
    db_obra = crud.get_obra_by_id(db=db, id=id)
    if not db_obra:
        raise HTTPException(status_code=404, detail='Obra not found')
    crud.delete_obra(db=db, id=id)
    return 204


@app.get('/obras/get-by-id/{id}', status_code=200)
def get_by_id(id: int, db:Session = Depends(get_db)):
    db_obra = crud.get_obra_by_id(db=db, id=id)
    if not db_obra:
        raise HTTPException(status_code=404, detail='Obra not found')
    return 200


@app.get('/obras/get-all', response_model=(List[schemas.Obra]))
def get_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_obras(db, skip=skip, limit=limit)


@app.post('/obras/get-by-type', response_model=(List[schemas.Obra]))
def get_by_type(types: List[str], db: Session = Depends(get_db)):
    print(types)
    if not types:
        return crud.get_obras(db, skip=0, limit=100)
    else:
        query = crud.get_obras_by_type(db=db, types=types)
        if not query:
            raise HTTPException(status_code=404, detail='No obra found with that type')
        else:
            return query


@app.get('/obras/get-all-types', response_model=(List[schemas.Type]))
def get_all_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_types(db=db, skip=skip, limit=limit)


@app.get('/obras/get-by-name/{nameObra}', response_model=schemas.Obra)
async def get_by_name(nameObra: str, db: Session = Depends(get_db)):
    db_obra = crud.get_obra_by_name(db=db, name=nameObra)
    if not db_obra:
        raise HTTPException(status_code=404, detail="Obra not found")
    return db_obra

#Using tempPath, CORS blocks bucket
tempPath = ["photo_stock.jpeg","photo_stock.jpeg","photo_stock.jpeg"]

@app.post('/files/antes/{nameObra}')
async def create_files_antes(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    path = []

    # for image in images:
    #     file_name = nameObra.lower() + '_antes_' + str(images.index(image)) + \
    #         "." + image.content_type.split("/")[1]
    #     try:
    #         minio_client.fput_object()
    #             environs.s3_bucket, file_name, image.file.fileno())
    #         path.append("http://172.17.0.1:9000/" +
    #                     environs.s3_bucket+"/"+file_name)
    #     except S3Error as err:
    #         print(err)

    crud.append_img(db=db, nameObra=nameObra, type="antes", path=tempPath)

    return "ok"


@app.post('/files/durante/{nameObra}')
async def create_files_durante(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    path = []

    # for image in images:
    #     file_name = nameObra.lower() + '_durante_' + str(images.index(image)) + \
    #         "." + image.content_type.split("/")[1]
    #     try:
    #         minio_client.fput_object(
    #             environs.s3_bucket, file_name, image.file.fileno())
    #         path.append("http://172.17.0.1:9000/" +
    #                     environs.s3_bucket+"/"+file_name)
    #     except S3Error as err:
    #         print(err)

    crud.append_img(db=db, nameObra=nameObra, type="durante", path=tempPath)

    return "ok"


@app.post('/files/depois/{nameObra}')
async def create_files_depois(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    path = []

    # for image in images:
    #     file_name = nameObra.lower() + '_depois_' + str(images.index(image)) + \
    #         "." + image.content_type.split("/")[1]
    #     try:
    #         minio_client.fput_object(
    #             environs.s3_bucket, file_name, image.file.fileno())
    #         path.append("http://172.17.0.1:9000/" +
    #                     environs.s3_bucket+"/"+file_name)
    #     except S3Error as err:
    #         print(err)

    crud.append_img(db=db, nameObra=nameObra, type="depois", path=tempPath)

    return "ok"

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
