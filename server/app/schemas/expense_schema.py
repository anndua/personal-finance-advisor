from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExpenseCreate(BaseModel):
    title: str           # "Expense Name" from the form
    category: str
    amount: float
    date: Optional[str] = None   # arrives as "YYYY-MM-DD" string
    notes: Optional[str] = None