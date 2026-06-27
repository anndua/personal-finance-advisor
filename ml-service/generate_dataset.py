import random
import pandas as pd

TARGET_PER_CLASS = 333

data = []

counts = {
    "Conservative": 0,
    "Moderate": 0,
    "Aggressive": 0
}

while min(counts.values()) < TARGET_PER_CLASS:

    age = random.randint(18, 65)
    income = random.randint(200000, 3000000)
    savings = random.randint(10000, 5000000)
    experience = random.randint(0, 20)
    horizon = random.randint(1, 30)

    score = 0

    # -------------------------
    # Age (0–20)
    # -------------------------
    if age <= 25:
        score += 20
    elif age <= 35:
        score += 15
    elif age <= 45:
        score += 10
    elif age <= 55:
        score += 5

    # -------------------------
    # Income (0–20)
    # -------------------------
    if income >= 2000000:
        score += 20
    elif income >= 1200000:
        score += 15
    elif income >= 700000:
        score += 10
    elif income >= 400000:
        score += 5

    # -------------------------
    # Savings (0–20)
    # -------------------------
    if savings >= 2500000:
        score += 20
    elif savings >= 1500000:
        score += 15
    elif savings >= 700000:
        score += 10
    elif savings >= 200000:
        score += 5

    # -------------------------
    # Experience (0–20)
    # -------------------------
    score += experience

    # -------------------------
    # Investment Horizon (0–20)
    # -------------------------
    score += min(horizon, 20)

    # -------------------------
    # Random variation
    # -------------------------
    score += random.randint(-10, 10)

    score = max(0, min(score, 100))

    # -------------------------
    # Assign class
    # -------------------------
    if score < 35:
        risk = "Conservative"
    elif score < 70:
        risk = "Moderate"
    else:
        risk = "Aggressive"

    # Keep dataset balanced
    if counts[risk] < TARGET_PER_CLASS:

        counts[risk] += 1

        data.append([
            age,
            income,
            savings,
            experience,
            horizon,
            score,
            risk
        ])

# Add one extra Moderate sample to make exactly 1000 rows
while len(data) < 1000:

    age = random.randint(30, 45)
    income = random.randint(600000, 1200000)
    savings = random.randint(300000, 1000000)
    experience = random.randint(5, 10)
    horizon = random.randint(8, 15)

    data.append([
        age,
        income,
        savings,
        experience,
        horizon,
        55,
        "Moderate"
    ])

df = pd.DataFrame(
    data,
    columns=[
        "age",
        "income",
        "savings",
        "experience",
        "horizon",
        "risk_score",
        "risk_profile"
    ]
)

df.to_csv("data/risk_data.csv", index=False)

print("\nDataset Generated Successfully!\n")
print(df["risk_profile"].value_counts())