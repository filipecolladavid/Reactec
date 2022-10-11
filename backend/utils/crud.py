import base64
from collections import OrderedDict
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas
from unidecode import unidecode


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_name(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    pwd = base64.b64encode(user.password.encode('utf-8'))
    db_user = models.User(username=(user.username), hashed_password=pwd)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def verifyPwd(db: Session, user: schemas.UserCreate):
    return db.query(models.User).filter(models.User.username == user.username, models.User.hashed_password == base64.b64encode(user.password.encode('utf-8'))).first()


def create_obra(db: Session, obra: schemas.ObraBase):
    obra_name = unidecode(obra.nameDisplayed).lower().replace(' ', '_');
    typeList = [
        'antes', 'durante', 'depois']
    db_img = []
    for i in typeList:
        db_img.append(models.Image(type=i, path=[]))

    db_obra = models.Obra(name=obra_name,
                          nameDisplayed=(obra.nameDisplayed),
                          startDate=(obra.startDate),
                          endDate=(obra.endDate),
                          district=(obra.district),
                          desc=(obra.desc),
                          img=db_img)
    db.add(db_obra)
    for i in obra.type:
        db_query_type = db.query(models.Type).filter(
            models.Type.name == i).first()
        if db_query_type:
            db_obra.type.append(db_query_type)
        else:
            db_obra.type.append(models.Type(name=i))
    db.commit()
    db.refresh(db_obra)

    return db_obra

def delete_obra(db: Session, id: int):
    obra = db.query(models.Obra).filter(models.Obra.id == id).first();
    db.delete(obra);
    db.commit();

def get_obra_by_id(db: Session, id: int):
    return db.query(models.Obra).filter(models.Obra.id == id).first()


def get_obras(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Obra).offset(skip).limit(limit).all()


def get_obra_by_name(db: Session, name: str):
    return db.query(models.Obra).filter(models.Obra.name == name).first()


def get_obras_by_district(db: Session, district: str):
    return db.query(models.Obra).filter(models.Obra.district == district).all()


def get_obras_by_type(db: Session, types: List[str]):
    obras = []
    for t in types:
        query = db.query(models.Type).filter(
            models.Type.name == t).first()
        if not query:
            pass
        else:
            db_obra = query.obras
            for o in db_obra:
                obras.append(o)
            else:
                return list(OrderedDict.fromkeys(obras))
    return None

def get_types(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Type).offset(skip).limit(limit).all()

#Append img to type in obra

def append_img(db: Session, nameObra: str, type: str, path: List[str]):

    db_obra = get_obra_by_name(db=db, name=nameObra)

    id = db_obra.id

    query_img = db.query(models.Image).filter(models.Image.obra_id == id, models.Image.type == type).first()

    for p in path:
        query_img.path.append(models.Path(name=p))

    db.add(query_img)
    db.commit()
    db.refresh(db_obra)

    return db_obra
