from pydantic import BaseModel
from datetime import datetime


class ExpenseCreate(BaseModel):
    category: str
    amount: float
    description: str
    date: datetime