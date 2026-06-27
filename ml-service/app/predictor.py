from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "risk_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_risk(data):

    features = [[
        data["age"],
        data["income"],
        data["savings"],
        data["experience"],
        data["horizon"]
    ]]

    prediction = model.predict(features)

    return prediction[0]