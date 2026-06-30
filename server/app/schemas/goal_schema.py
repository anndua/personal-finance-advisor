from pydantic import BaseModel
from typing import Optional


class GoalCreate(BaseModel):
    name: str                          # frontend sends "name"
    targetAmount: float                # frontend sends "targetAmount"
    currentAmount: float = 0.0        # frontend sends "currentAmount"
    deadline: Optional[str] = None    # frontend sends "deadline" (date string)