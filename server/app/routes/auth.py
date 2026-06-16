from fastapi import APIRouter
from app.database.mongo import db
from app.schemas.user_schema import UserRegister, UserLogin
from app.utils.auth import hash_password, verify_password,create_access_token

router = APIRouter()


@router.post("/register")
async def register(user: UserRegister):

    existing_user = await db.users.find_one({"email": user.email})

    if existing_user:
        return {"message": "Email already exists"}

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    await db.users.insert_one(new_user)

    return {"message": "User registered successfully"}


@router.post("/login")
async def login(user: UserLogin):

    existing_user = await db.users.find_one({"email": user.email})

    if not existing_user:
        return {"message": "User not found"}

    if not verify_password(user.password, existing_user["password"]):
        return {"message": "Invalid password"}
    token = create_access_token(
    {"email": existing_user["email"]}
)

    return {
    "message": "Login successful",
    "access_token": token,
    "token_type": "bearer"
}
