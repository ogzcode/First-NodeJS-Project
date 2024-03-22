from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True

class UserDetailsBase(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    address: str
    phone: str
    role: str
    created_at: str

class UserDetails(UserDetailsBase):
    id: int

    class Config:
        from_attributes = True
