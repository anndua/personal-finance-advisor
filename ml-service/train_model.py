#import pandas as pd
#from sklearn.tree import DecisionTreeClassifier
#import joblib

# Load dataset
#df = pd.read_csv("risk_data.csv")

# Features
#X = df[["age", "income", "savings", "experience", "horizon"]]

# Target
#y = df["risk_profile"]

# Train model
#model = DecisionTreeClassifier()
#model.fit(X, y)

# Save model
#joblib.dump(model, "risk_model.pkl")

#print("Model trained and saved successfully!")
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("data/risk_data.csv")

X = df[[
    "age",
    "income",
    "savings",
    "experience",
    "horizon"
]]

y = df["risk_profile"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("=" * 50)
print("Decision Tree")
print("=" * 50)

dt = DecisionTreeClassifier(
    random_state=42,
    max_depth=5
)

dt.fit(X_train, y_train)

dt_pred = dt.predict(X_test)

print("Accuracy:", accuracy_score(y_test, dt_pred))
print(classification_report(y_test, dt_pred))

print("\n" + "=" * 50)
print("Random Forest")
print("=" * 50)

rf = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

rf.fit(X_train, y_train)

rf_pred = rf.predict(X_test)

print("Accuracy:", accuracy_score(y_test, rf_pred))
print(classification_report(y_test, rf_pred))

# Save the better model
joblib.dump(rf, "models/risk_model.pkl")

print("\nRandom Forest model saved successfully!")