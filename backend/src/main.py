from typing import List
from fastapi import Depends, FastAPI, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import crud, models, schemas
from .database import SessionLocal, engine
from minio import Minio
from minio.error import S3Error

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='Reatec-Backend')

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'])

client = Minio(
    "play.min.io",
    access_key="Q3AM3UQ867SPQQA43P2F",
    secret_key="zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
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


@app.get('/obras/get-all', response_model=(List[schemas.Obra]))
def get_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_obras(db, skip=skip, limit=limit)


@app.post('/obras/get-by-type', response_model=(List[schemas.Obra]))
def get_by_type(types: List[schemas.TypeBase], db: Session = Depends(get_db)):
    db_obra = crud.get_obra_by_type(db=db, types=types)
    return db_obra


@app.get('/obras/get-all-types', response_model=(List[schemas.Type]))
def get_all_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_types(db=db, skip=skip, limit=limit)


@app.post('/files/antes/{nameObra}')
async def create_files_antes(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    crud.append_img(db=db, nameObra=nameObra, type="antes",
                    path=["teste_1", "teste_2", "teste_3"])

    # for image in images:
    #     ext = image.filename.split('.')[1]
    #     file_name = nameObra + '_antes_' + str(images.index(image))
    #     file_location = 'img/' + file_name + '.' + ext
    #     with open(file_location, 'wb+') as (file_object):
    #         file_object.write(image.file.read())
    # else:
    #     return {'info': f"file '{file_name}' saved at '{file_location}'"}
    return "ok"


@app.post('/files/durante/{nameObra}')
async def create_files_durante(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    crud.append_img(db=db, nameObra=nameObra, type="durante",
                    path=["teste_1", "teste_2", "teste_3"])

    for image in images:
        ext = image.filename.split('.')[1]
        file_name = nameObra + '_durante_' + str(images.index(image))
        file_location = 'img/' + file_name + '.' + ext
        with open(file_location, 'wb+') as (file_object):
            file_object.write(image.file.read())
    else:
        return {'info': f"file '{file_name}' saved at '{file_location}'"}


@app.post('/files/depois/{nameObra}')
async def create_files_depois(nameObra: str, images: List[UploadFile] = File(...), db: Session = Depends(get_db)):

    crud.append_img(db=db, nameObra=nameObra, type="durante",
                    path=["teste_1", "teste_2", "teste_3"])

    for image in images:
        ext = image.filename.split('.')[1]
        file_name = nameObra + '_depois_' + str(images.index(image))
        file_location = 'img/' + file_name + '.' + ext
        with open(file_location, 'wb+') as (file_object):
            file_object.write(image.file.read())
    else:
        return {'info': f"file '{file_name}' saved at '{file_location}'"}


@app.get('/files/get-images/{img_name}')
async def get_files_obra(img_name: str):
    home_path = '/home/fcd/Desktop/Reactec/backend/img/'
    return FileResponse(home_path + img_name)
