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
        from_attributes = True


# -------------------------------------------------------------


class UserBase(BaseModel):
    name: str
    email: str
    password: str
    role: str
    
class UserModel(UserBase):
    id: int

    class Config:
        from_attributes = True
