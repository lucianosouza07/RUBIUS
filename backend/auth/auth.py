from fastapi import Cookie, HTTPException
from pwdlib import PasswordHash
import datetime
import jwt
import os
import logging

SECRET_KEY = os.getenv("JWT_ENCODE_KEY")
EXPIRATION_DATE = datetime.timedelta(days=1)
JWT_ALGORITHM = "HS256"

logger = logging.getLogger("uvicorn.error")

password_hash = PasswordHash.recommended()

def hash_password(raw_password: str):
    return password_hash.hash(raw_password)

def verify_password(raw_password: str, hashed_password: str):
    valid, updated_hash = password_hash.verify_and_update(raw_password, hashed_password)
    return valid, updated_hash

def create_access_token(payload: dict[str, object]):
    payload_copy = payload.copy()

    now = datetime.datetime.now(datetime.timezone.utc)
    expiration = now + EXPIRATION_DATE

    payload_copy.update({"exp": expiration, "iat": now})

    return jwt.encode(payload_copy, SECRET_KEY, algorithm=JWT_ALGORITHM)

def get_current_user(token: str = Cookie(None)):
    if not token:
        raise HTTPException(401)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return {"user": payload}

    except Exception:
        raise HTTPException(401)
