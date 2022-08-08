from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, Date, Boolean, ARRAY
from sqlalchemy.orm import relationship
from database import Base



class Obras(Base):
    __tablename__ = "obras"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), unique=True)
    nameDisplayed = Column(Text())
    date = Column(Date())
    desc = Column(Text())
    type = Column(ARRAY(String(20)))
    district = Column(String(20))
    images = relationship("Images", backref="obras")

class Images(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), unique=True)
    type = Column(String(20)) #before, while, after
    path = Column(ARRAY(String((100)))) # 3 fotos cada id, 3 paths

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)