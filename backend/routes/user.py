from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.user_services import UserServices
from database.config import db
from utils.schemas import CustomResponse
from auth.auth import token_services

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.delete("/deleteAllUser", response_model=CustomResponse, dependencies=[Depends(token_services.check_role("admin"))])
async def delete_all_user(db: Session = Depends(db.get_session)):
    try:
        res = UserServices().delete_all_user(db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return CustomResponse(
        message="All Users deleted successfully",
        data={},
        status=200
    )