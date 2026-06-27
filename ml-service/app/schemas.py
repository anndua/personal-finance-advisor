from pydantic import BaseModel

class SIPRequest(BaseModel):
    monthly_investment: float
    annual_rate: float
    years: int