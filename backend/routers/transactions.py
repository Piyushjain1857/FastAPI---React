from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated, List
from database import SessionLocal
import models
import schemas

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", response_model=schemas.TransactionModel)
async def create_transaction(transaction: schemas.TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.model_dump() if hasattr(transaction, 'model_dump') else transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/", response_model=List[schemas.TransactionModel])
async def read_transactions(
    db: db_dependency,
    skip: int = 0,
    limit: int = 100
):
    transactions = (
        db.query(models.Transaction)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return transactions
