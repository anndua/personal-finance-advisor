import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# Load dataset
df = pd.read_csv("risk_data.csv")

# Features
X = df[["age", "income", "savings", "experience", "horizon"]]

# Target
y = df["risk_profile"]

# Train model
model = DecisionTreeClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "risk_model.pkl")

print("Model trained and saved successfully!")