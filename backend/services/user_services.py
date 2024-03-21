from sqlalchemy.orm import Session
from database.models import User
from database.schemas import UserCreate, User as UserSchemas


class UserServices:
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> UserSchemas:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        
        return UserSchemas(**user.__dict__)

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> UserSchemas:
        user = db.query(User).filter(User.username == username).first()
        return UserSchemas(**user.__dict__)
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> UserSchemas:
        user = db.query(User).filter(User.id == user_id).first()
        return UserSchemas(**user.__dict__)

    @staticmethod
    def create_user(db: Session, new_user: UserCreate, role: str = None) -> UserSchemas:
        user = User(**new_user.model_dump())
        user.role = role if role else "user"
        user.password = user.get_password_hash(new_user.password)
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return UserSchemas(**user.__dict__)
    
    @staticmethod
    def verify_user_password(db: Session, email: str, password: str) -> bool:
        user = db.query(User).filter(User.email == email).first()
        return user.verify_password(password)
    
    @staticmethod
    def get_all_users(db: Session) -> list[UserSchemas]:
        users = db.query(User).all()
        return [UserSchemas(**user.__dict__) for user in users]
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> UserSchemas:
        user = db.query(User).filter(User.id == user_id).first()
        db.delete(user)
        db.commit()
        return UserSchemas(**user.__dict__)

    @staticmethod
    def update_user(db: Session, user_id: int, user: UserCreate) -> UserSchemas:
        user = db.query(User).filter(User.id == user_id).first()
        user.username = user.username
        user.email = user.email
        user.password = user.get_password_hash(user.password)
        db.commit()
        db.refresh(user)
        return UserSchemas(**user.__dict__)
    
    @staticmethod
    def delete_all_user(db: Session):
        db.query(User).filter(User.email != "admin@mail.com").delete()
        db.commit()