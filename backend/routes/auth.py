from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.user_services import UserServices
from database.config import db
from utils.schemas import CustomResponse, RegisterSchema, AuthSchema
from auth.auth import token_services

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


def validate_password(user: AuthSchema):
    if len(user.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters"
        )


@router.post("/register", response_model=CustomResponse)
async def register_user(user: RegisterSchema, db: Session = Depends(db.get_session)):
    try:
        if user.username == "admin":
            new_user = UserServices().create_user(db, user, "admin")
        else:
            new_user = UserServices().create_user(db, user)

        return CustomResponse(
            message="User created successfully",
            data={
                "user": new_user
            },
            status=201
        )
    except HTTPException as e:
        raise e


@router.post("/login", dependencies=[Depends(validate_password)])
async def login_user(user: AuthSchema, db: Session = Depends(db.get_session)):
    try:
        db_user = UserServices().get_user_by_email(db, user.email)

        if not db_user or not UserServices().verify_user_password(db, user.email, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid credentials"
            )

        token = token_services.create_access_token({
            "id": db_user.id,
            "role": db_user.role
        })
        return CustomResponse(
            message="User logged in successfully",
            data={
                "token": token,
                "user": db_user
            },
            status=200
        )
    except HTTPException as e:
        print(e)
        raise e
