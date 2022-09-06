from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column((String(255)), unique=True, index=True)
    hashed_password = Column(String(255))


obra_type = Table('obra_type', Base.metadata, Column(
    'obras_id', ForeignKey('obras.id')), Column('types_id', ForeignKey('types.id')))


class Obra(Base):
    __tablename__ = 'obras'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    nameDisplayed = Column(String(255))
    startDate = Column(String(255))
    endDate = Column(String(255))
    district = Column(String(255))
    desc = Column(String(1000))
    type = relationship('Type', secondary=obra_type, backref='obras')
    img = relationship('Image', backref='obras')

    def __hash__(self):
        return hash(self.id)


class Type(Base):
    __tablename__ = 'types'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))


class Image(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    type = Column(String(255))
    path = relationship('Path', backref='images')
    obra_id = Column(ForeignKey('obras.id'))


class Path(Base):
    __tablename__ = 'path'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    img_id = Column(ForeignKey('images.id'))
