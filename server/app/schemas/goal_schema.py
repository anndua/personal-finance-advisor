from pydantic import BaseModel


class GoalCreate(BaseModel):
    title: str
    target_amount: float
    current_amount: float