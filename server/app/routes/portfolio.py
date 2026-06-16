from fastapi import APIRouter, Depends
from bson import ObjectId

from app.database.mongo import db
from app.schemas.portfolio_schema import PortfolioCreate
from app.utils.auth import verify_token

router = APIRouter()


@router.post("/")
async def add_portfolio(
    portfolio: PortfolioCreate,
    user=Depends(verify_token)
):

    await db.portfolio.insert_one(portfolio.dict())

    return {"message": "Portfolio added successfully"}


@router.get("/")
async def get_portfolio(
    user=Depends(verify_token)
):

    portfolio = []

    async for item in db.portfolio.find():
        item["_id"] = str(item["_id"])
        portfolio.append(item)

    return portfolio


@router.put("/{portfolio_id}")
async def update_portfolio(
    portfolio_id: str,
    portfolio: PortfolioCreate,
    user=Depends(verify_token)
):

    await db.portfolio.update_one(
        {"_id": ObjectId(portfolio_id)},
        {"$set": portfolio.dict()}
    )

    return {"message": "Portfolio updated successfully"}


@router.delete("/{portfolio_id}")
async def delete_portfolio(
    portfolio_id: str,
    user=Depends(verify_token)
):

    await db.portfolio.delete_one(
        {"_id": ObjectId(portfolio_id)}
    )

    return {"message": "Portfolio deleted successfully"}