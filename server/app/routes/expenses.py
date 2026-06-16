from fastapi import APIRouter, Depends
from bson import ObjectId

from app.database.mongo import db
from app.schemas.expense_schema import ExpenseCreate
from app.utils.auth import verify_token

router = APIRouter()


@router.post("/")
async def add_expense(
    expense: ExpenseCreate,
    user=Depends(verify_token)
):

    await db.expenses.insert_one(expense.dict())

    return {"message": "Expense added successfully"}


@router.get("/")
async def get_expenses(
    user=Depends(verify_token)
):

    expenses = []

    async for expense in db.expenses.find():
        expense["_id"] = str(expense["_id"])
        expenses.append(expense)

    return expenses


@router.put("/{expense_id}")
async def update_expense(
    expense_id: str,
    expense: ExpenseCreate,
    user=Depends(verify_token)
):

    await db.expenses.update_one(
        {"_id": ObjectId(expense_id)},
        {"$set": expense.dict()}
    )

    return {"message": "Expense updated successfully"}


@router.delete("/{expense_id}")
async def delete_expense(
    expense_id: str,
    user=Depends(verify_token)
):

    await db.expenses.delete_one(
        {"_id": ObjectId(expense_id)}
    )

    return {"message": "Expense deleted successfully"}