from pydantic import BaseModel

class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str

class TransactionModel(TransactionBase):
    id: int
    class Config:
        from_attributes = True # updated for pydantic v2 if needed, but keeping orm_mode for compatibility if they use v1
        orm_mode = True
