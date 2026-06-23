from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated, List
from database import SessionLocal
import models
import schemas

# CRUD - Create, Read/readAll, Update, Delete
router = APIRouter(
    prefix="",
    tags=["login"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/login")
async def login_user(login_request: schemas.LoginRequest, db: db_dependency):

    db_user = (
        db.query(models.User).filter(models.User.email == login_request.email).first()
    )

    if not db_user:
        return "User not found"

    if db_user.password != login_request.password:
        return "Invalid password"

    return {"message": "Login successful", "user": db_user}
