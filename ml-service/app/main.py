from fastapi import FastAPI
from app.predictor import predict_risk
from app.portfolio import recommend_portfolio
from app.sip import calculate_sip
from app.schemas import SIPRequest

app = FastAPI(
    title="Personal Finance & Mutual Fund Advisor API",
    version="2.0"
)

@app.get("/")
def home():
    return {"message": "ML Service Running Successfully"}

@app.get("/health")
def health():
    return {"status": "OK"}

@app.post("/predict-risk")
def predict(data: dict):
    risk = predict_risk(data)
    portfolio = recommend_portfolio(risk)

@app.post("/calculate-sip")
def sip(data: SIPRequest):
    return calculate_sip(
        data.monthly_investment,
        data.annual_rate,
        data.years
    )

    return {
        "risk_profile": risk,
        "portfolio": {
            "equity": portfolio["equity"],
            "debt": portfolio["debt"],
            "gold": portfolio["gold"]
        },
        "recommended_funds": portfolio["recommended_funds"]
    }