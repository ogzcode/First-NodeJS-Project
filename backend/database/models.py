from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String
from .config import db
from datetime import datetime

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
    
class UserDetails(db.Base):
    __tablename__ = "user_details"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    first_name = Column(String, default="")
    last_name = Column(String, default="")
    address = Column(String, default="")
    phone = Column(String, default="")
    role = Column(String, default="")
    created_at = Column(String, default=datetime.now().strftime("%d-%m-%y"))

    def __repr__(self):
        return f"<UserDetails(user_id={self.user_id}, first_name={self.first_name}, last_name={self.last_name})>"
    
    def model_dumb(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "phone": self.phone,
            "role": self.role,
            "created_at": self.created_at
        }