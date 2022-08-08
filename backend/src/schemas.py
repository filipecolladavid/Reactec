from datetime import date
from typing import List
from pydantic import BaseModel

class Images(BaseModel):
    id: int
    name: str
    type: str
    path: List[str]

class Obras(BaseModel):
    id: int
    name: str
    nameDisplayed: str
    date: date
    desc: str
    type: List[str]
    district: str
    images: Images

    class Config:
        orm_mode = True

class Users(BaseModel):
    id: int
    username: str
    password: str
    is_active: bool
