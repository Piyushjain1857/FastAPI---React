from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated, List
from database import SessionLocal
import models
import schemas

# CRUD - Create, Read/readAll, Update, Delete
router = APIRouter(
    prefix="",
    tags=["users"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/users", response_model=schemas.UserModel)
async def create_user(user: schemas.UserBase, db: db_dependency):
    db_user = models.User(
        **(user.model_dump() if hasattr(user, "model_dump") else user.dict())
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/users", response_model=List[schemas.UserModel])
async def read_users(db: db_dependency, skip: int = 0, limit: int = 100):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users


@router.put("/{user_id}", response_model=schemas.UserModel)
async def update_user(user_id: int, user: schemas.UserBase, db: db_dependency):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        return {"message": "user not found"}
    db_user.name = user.name
    db_user.email = user.email
    db_user.password = user.password
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/user/{user_id}")
async def read_user(db: db_dependency, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    return user


@router.delete("/users/{user_id}")
async def delete_user(db: db_dependency, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    db.delete(user)
    db.commit()

