from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.Users)
def create_user(user: schemas.Users, db: Session = Depends(get_db)):
    if user.username != 'reatec':
        raise HTTPException(status_code=405, detail="Not Allowed")
    return crud.create_user(db=db, user = user)
