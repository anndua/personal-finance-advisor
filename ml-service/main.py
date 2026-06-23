from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load("risk_model.pkl")

@app.get("/")
def home():
    return {"message": "ML Service Running"}

@app.post("/predict-risk")
def predict(data: dict):

    features = [[
        data["age"],
        data["income"],
        data["savings"],
        data["experience"],
        data["horizon"]
    ]]

    prediction = model.predict(features)

    return {
        "risk_profile": prediction[0]
    }