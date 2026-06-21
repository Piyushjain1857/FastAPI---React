from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated, List
from database import SessionLocal
import models
import schemas

# CRUD - Create, Read/readAll, Update, Delete
router = APIRouter(
    prefix="",
    tags=["transactions"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/transactions", response_model=schemas.TransactionModel)
async def create_transaction(transaction: schemas.TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(
        **(
            transaction.model_dump()
            if hasattr(transaction, "model_dump")
            else transaction.dict()
        )
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@router.put("/transactions/{transaction_id}", response_model=schemas.TransactionModel)
async def update_transaction(
    transaction_id: int, transaction: schemas.TransactionBase, db: db_dependency
):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )

    if not db_transaction:
        return {"message": "Transaction not found"}

    db_transaction.amount = transaction.amount
    db_transaction.category = transaction.category
    db_transaction.description = transaction.description
    db_transaction.is_income = transaction.is_income
    db_transaction.date = transaction.date

    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@router.get("/transactions", response_model=List[schemas.TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions


@router.get("/transactions/{transaction_id}")
async def read_transaction(db: db_dependency, transaction_id: int):
    transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )
    if not transaction:
        return {"message": "Transaction not found"}
    return transaction


@router.delete("/transactions/{transaction_id}")
async def delete_transaction(db: db_dependency, transaction_id: int):
    transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )
    if not transaction:
        return {"message": "Transaction not found"}
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted"}




