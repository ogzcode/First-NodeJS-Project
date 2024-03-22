from sqlalchemy.orm import Session
from database.models import UserDetails
from database.schemas import UserDetails as UserDetailsSchemas, UserDetailsBase


class UserDetailServices:
    @staticmethod
    def get_user_details_by_id(db: Session, user_id: int) -> UserDetailsSchemas:
        user_details = db.query(UserDetails).filter(UserDetails.user_id == user_id).first()
        return UserDetailsSchemas(**user_details.__dict__)

    @staticmethod
    def create_user_details(db: Session, user_id) -> UserDetailsSchemas:
        new_user_details = UserDetails(user_id=user_id)
        db.add(new_user_details)
        db.commit()
        db.refresh(new_user_details)
        return UserDetailsSchemas(**new_user_details.__dict__)

    @staticmethod
    def update_user_details(db: Session, user_id: int, user_details: UserDetailsSchemas) -> UserDetailsSchemas:
        user_details = db.query(UserDetails).filter(UserDetails.user_id == user_id).first()
        user_details.first_name = user_details.first_name
        user_details.last_name = user_details.last_name
        user_details.address = user_details.address
        user_details.phone = user_details.phone
        db.commit()
        db.refresh(user_details)
        return UserDetailsSchemas(**user_details.__dict__)
    
    @staticmethod
    def delete_user_details(db: Session, user_id: int) -> UserDetailsSchemas:
        user_details = db.query(UserDetails).filter(UserDetails.user_id == user_id).first()
        db.delete(user_details)
        db.commit()
        return UserDetailsSchemas(**user_details.__dict__)