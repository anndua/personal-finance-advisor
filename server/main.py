from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.mongo import db
from app.routes.auth import router as auth_router
from app.routes.expenses import router as expense_router
from app.routes.goals import router as goal_router
from app.routes.portfolio import router as portfolio_router

app = FastAPI(title="Personal Finance Advisor API")

# Allow the React dev server to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,      prefix="/auth",      tags=["Authentication"])
app.include_router(expense_router,   prefix="/expenses",  tags=["Expenses"])
app.include_router(goal_router,      prefix="/goals",     tags=["Goals"])
app.include_router(portfolio_router, prefix="/portfolio", tags=["Portfolio"])


@app.get("/")
async def home():
    return {"message": "Backend running successfully"}


@app.get("/test-db")
async def test_db():
    collections = await db.list_collection_names()
    return {"status": "MongoDB connected", "collections": collections}
