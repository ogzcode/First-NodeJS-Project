from .config import db
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(db.Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="user")

    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.password)

    def get_password_hash(self, password):
        return pwd_context.hash(password)

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email})>"
    
    def model_dumb(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        }
    