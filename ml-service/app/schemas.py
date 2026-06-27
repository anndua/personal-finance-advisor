from pydantic import BaseModel, Field


class RiskRequest(BaseModel):
    age: int = Field(..., ge=18, le=100)
    income: float = Field(..., gt=0)
    savings: float = Field(..., ge=0)
    experience: int = Field(..., ge=0, le=50)
    horizon: int = Field(..., ge=1, le=50)


class SIPRequest(BaseModel):
    monthly_investment: float = Field(..., gt=0)
    annual_rate: float = Field(..., gt=0, le=100)
    years: int = Field(..., gt=0, le=50)