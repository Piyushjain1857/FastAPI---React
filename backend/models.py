from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    is_income = Column(Boolean)
    date = Column(String)
    
class User(Base):
    __tablename__ = 'users'
    
    id= Column(Integer, primary_key=True, index=True)
    name= Column(String)
    email= Column(String, unique=True, index=True)
    password= Column(String)
    role= Column(String)