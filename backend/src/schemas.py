from typing import List
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class PathBase(BaseModel):
    name: str


class Path(PathBase):
    id: int

    class Config:
        orm_mode = True


class ImageBase(BaseModel):
    type: str
    path: List[Path]


class Image(ImageBase):
    id: int

    class Config:
        orm_mode = True


class TypeBase(BaseModel):
    name: str


class Type(TypeBase):
    id: int

    class Config:
        orm_mode = True


class ObraBase(BaseModel):
    nameDisplayed: str
    startDate: str
    endDate: str
    district: str
    desc: str
    type: List[str]


class Obra(ObraBase):
    id: int
    name: str
    img: List[Image]
    type: List[Type]

    class Config:
        orm_mode = True


class TypeSchema(Type):
    obras: List[Obra]


class ObraSchema(Obra):
    type: List[Type]
