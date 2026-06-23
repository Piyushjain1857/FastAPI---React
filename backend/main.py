from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import login
from routes import user_routes
from routes import transaction_routes
from database import SessionLocal, engine
import models

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

app.include_router(transaction_routes.router)
app.include_router(user_routes.router)
app.include_router(login.router)