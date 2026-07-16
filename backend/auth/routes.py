from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.orm import Session

from auth.auth import get_current_user, hash_password, verify_password, create_access_token
from database import  get_db
from models import User
from schemas import UserCreate
import logging

TOKEN_COOKIE_NAME = "token"

router = APIRouter()
logger = logging.getLogger("uvicorn.error")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == user.email).first()

    if exists:
        logger.debug("Email already exists")
        raise HTTPException(400)

    new_user = User(email=user.email, password_hash=hash_password(user.password))

    db.add(new_user)
    db.commit()


@router.post("/login")
def login(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        logger.debug("User doesn't exist")
        raise HTTPException(400)

    valid, updated_hash = verify_password(user.password, db_user.password_hash)

    if not valid:
        logger.debug("Password is not valid")
        raise HTTPException(400)

    if updated_hash is not None:
        logger.debug("Updated password hash")
        db_user.password_hash = str(updated_hash)
        db.commit()

    jwt_token = create_access_token({"sub": str(db_user.id)})

    response.set_cookie(
        key=TOKEN_COOKIE_NAME,
        value=jwt_token,
        httponly=True,
        max_age=3600,
        expires=3600,
        samesite="lax",
        secure=True,
    )
    # return { "access_token": create_access_token({"sub": str(db_user.id)}) }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key=TOKEN_COOKIE_NAME)

@router.get("/me")
def me(current_user = Depends(get_current_user)):
    return current_user
