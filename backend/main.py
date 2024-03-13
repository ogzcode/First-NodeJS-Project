from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.config import db
from dotenv import load_dotenv

from routes import auth, user

app = FastAPI()

load_dotenv()

db.create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)

@app.get("/", tags=["root"])
async def root():
    return {"message": "Hello World"}