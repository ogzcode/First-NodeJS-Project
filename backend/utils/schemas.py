from pydantic import BaseModel, constr

class CustomResponse(BaseModel):
    message: str
    data: dict
    status: int

class AuthSchema(BaseModel):
    email: str
    password: str

class RegisterSchema(AuthSchema):
    username: str