import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class TokenServices:
    security = HTTPBearer()
    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def decode_access_token(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except PyJWTError:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        
    def get_current_user(self, credentials: HTTPAuthorizationCredentials = Depends(security)):
        credentials_exception = HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        token = credentials.credentials

        try:
            payload = self.decode_access_token(token)

            if payload is None:
                raise credentials_exception
            
            return {
                "id": payload.get("id"),
                "role": payload.get("role")
            }
        except PyJWTError:
            raise credentials_exception
        
    def check_role(self, role: str):
        def _check_role(current_user: dict = Depends(self.get_current_user)):
            if current_user.get("role") != role:
                raise HTTPException(status_code=403, detail="You don't have enough permissions")
            return current_user
        
        return _check_role
    

token_services = TokenServices()

