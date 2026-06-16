from pydantic import BaseModel


class PortfolioCreate(BaseModel):
    asset_name: str
    asset_type: str
    amount: float