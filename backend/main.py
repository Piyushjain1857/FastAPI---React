from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from routers import transactions
from schemas import UserBase, TransactionBase
from models import User, Transaction
from database import SessionLocal, engine
from database import engine
import models
from routers import transactions

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(transactions.router)
app.include_router(users.router)