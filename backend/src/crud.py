from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, username: str):
    if username in db:
        user_dict = db[username]
        return models.Users(**user_dict)


def create_user(db: Session, user: schemas.Users):
    pwd = get_password_hash(user.password)
    db_user = models.User(user.username, hashed_password=pwd)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def getObras(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Obras).offset(skip).limit(limit).all()


def createObra(db: Session, obra: schemas.Obras, img: schemas.Images):
    img = models.Images(img.name, img.type, img.path)
    db_obra = models.Obras(
        obra.name, 
        obra.nameDisplayed,
        obra.date,
        obra.type,
        obra.district,
        img
    )
    db.add(db_obra)
    db.commit()
    db.refresh(db_obra)
    return db_obra