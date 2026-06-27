# ML Service Documentation

## Overview

This service provides the backend APIs for the Personal Finance & Mutual Fund Advisor.

### Features

* Risk Profile Prediction using a Random Forest model
* Portfolio Recommendation
* SIP Calculator
* Input Validation using Pydantic
* Swagger API Documentation

---

## Project Structure

```
ml-service/
│
├── app/
│   ├── main.py
│   ├── predictor.py
│   ├── portfolio.py
│   ├── sip.py
│   ├── schemas.py
│   └── __init__.py
│
├── data/
│   └── risk_data.csv
│
├── models/
│   └── risk_model.pkl
│
├── train_model.py
├── generate_dataset.py
└── requirements.txt
```

---

## Installation

Create a virtual environment and install the dependencies:

```bash
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

---

## Run the Backend

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Available APIs

### POST /predict-risk

Predicts the user's investment risk profile and returns:

* Risk Profile
* Portfolio Allocation
* Recommended Mutual Funds

Required fields:

* age
* income
* savings
* experience
* horizon

---

### POST /sip

Calculates SIP returns.

Required fields:

* monthly_investment
* annual_return
* years

Returns:

* Total Invested
* Wealth Gained
* Maturity Amount

---

## Machine Learning Model

* Algorithm: Random Forest Classifier
* Dataset: Synthetic dataset generated using `generate_dataset.py`
* Model File: `models/risk_model.pkl`

To retrain the model:

```bash
python train_model.py
```

---

## Notes

* Input validation is handled using Pydantic.
* The trained model is loaded automatically during API startup.
* Frontend developers can use the Swagger documentation for request and response formats.
