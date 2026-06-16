from fastapi import APIRouter, Depends
from bson import ObjectId

from app.database.mongo import db
from app.schemas.goal_schema import GoalCreate
from app.utils.auth import verify_token

router = APIRouter()


@router.post("/")
async def add_goal(
    goal: GoalCreate,
    user=Depends(verify_token)
):

    await db.goals.insert_one(goal.dict())

    return {"message": "Goal added successfully"}


@router.get("/")
async def get_goals(
    user=Depends(verify_token)
):

    goals = []

    async for goal in db.goals.find():
        goal["_id"] = str(goal["_id"])
        goals.append(goal)

    return goals


@router.put("/{goal_id}")
async def update_goal(
    goal_id: str,
    goal: GoalCreate,
    user=Depends(verify_token)
):

    await db.goals.update_one(
        {"_id": ObjectId(goal_id)},
        {"$set": goal.dict()}
    )

    return {"message": "Goal updated successfully"}


@router.delete("/{goal_id}")
async def delete_goal(
    goal_id: str,
    user=Depends(verify_token)
):

    await db.goals.delete_one(
        {"_id": ObjectId(goal_id)}
    )

    return {"message": "Goal deleted successfully"}