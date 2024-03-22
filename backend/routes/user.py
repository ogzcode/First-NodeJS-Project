from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.user_services import UserServices
from services.user_detail_services import UserDetailServices
from database.config import db
from utils.schemas import CustomResponse, RegisterSchema
from auth.auth import token_services

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/admin/getAllUser", response_model=CustomResponse, dependencies=[Depends(token_services.check_role("admin"))], summary="Get all users for only admin role")
async def get_all_user(db: Session = Depends(db.get_session)):
    try:
        res = UserServices().get_all_users(db)
    except HTTPException as e:
        raise e

    return CustomResponse(
        message="All Users fetched successfully",
        data={
            "users": res
        },
        status=200
    )


@router.post("/admin/createUser", response_model=CustomResponse, dependencies=[Depends(token_services.check_role("admin"))], summary="Create user for only admin role")
async def create_user(user: RegisterSchema, db: Session = Depends(db.get_session)):
    try:
        new_user = UserServices().create_user(db, user)
        details = UserDetailServices().create_user_details(db, new_user.id)
    except HTTPException as e:
        print(e)
        raise e

    return CustomResponse(
        message="User created successfully",
        data={
            "user": new_user,
            "details": details
        },
        status=201
    )



@router.delete("/admin/deleteAllUser", response_model=CustomResponse, dependencies=[Depends(token_services.check_role("admin"))], summary="Delete all users for only admin role")
async def delete_all_user(db: Session = Depends(db.get_session)):
    try:
        res = UserServices().delete_all_user(db)
    except HTTPException as e:
        raise e
    
    return CustomResponse(
        message="All Users deleted successfully",
        data={},
        status=200
    )
