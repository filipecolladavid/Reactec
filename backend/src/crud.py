import base64
from collections import OrderedDict
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas


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
    obra_name = obra.nameDisplayed.replace(' ', '_')
    typeList = [
        'antes', 'durante', 'depois']
    db_img = []
    for i in typeList:
        # for x in range(3):
        #     # pathList.append(models.Path(
        #     #     name=(obra_name + '_' + i + '_' + str(x))))
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


def get_obras(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Obra).offset(skip).limit(limit).all()


def get_obra_by_name(db: Session, name: str):
    return db.query(models.Obra).filter(models.Obra.name == name).first()


def get_obras_by_district(db: Session, district: str):
    return db.query(models.Obra).filter(models.Obra.district == district).all()


def get_obras_by_type(db: Session, types: List[schemas.TypeBase]):
    obras = []
    for t in types:
        query = db.query(models.Type).filter(
            models.Type.name == t.name).first()
        if not query:
            pass
        else:
            db_obra = query.obras
            for o in db_obra:
                obras.append(o)
            else:
                return list(OrderedDict.fromkeys(obras))


def get_types(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Type).offset(skip).limit(limit).all()

#Append img to type in obra

def append_img(db: Session, nameObra: str, type: str, path: List[str]):

    db_obra = get_obra_by_name(db=db, name=nameObra)

    id = db_obra.id
    print(id)

    query_img = db.query(models.Image).filter(models.Image.obra_id == id, models.Image.type == type).first()

    pathList = []

    for p in path:
        pathList.append(models.Path(name=p))

    query_img.append()

    db.commit()
    db.refresh(db_obra)

    # if(db_obra.img.type == type):
    #     db_obra.img.type
    # db_img = []
    # pathList = []
    # for x in range(3):
    #     print(path[x])
    #     pathList.append(models.Path(
    #         name=(path[x])
    #     ))
    # db_img.append(models.Image(type=path, path=pathList))

    # db_obra.img.extend(db_img)

    # db.commit()
    # db.refresh(db_obra)
