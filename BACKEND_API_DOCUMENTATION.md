# Personal Finance Advisor - Backend API Documentation

## Tech Stack

* FastAPI
* MongoDB Atlas
* JWT Authentication
* Python

---

# Base URL

```
http://127.0.0.1:8000
```

---

# Authentication Flow

```
Register
↓
Login
↓
Receive JWT Token
↓
Store Token
↓
Send Token With Protected Requests
```

---

# Authorization Header

All protected APIs require:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Example:

```javascript
headers: {
  Authorization: `Bearer ${token}`
}
```

---

# AUTH APIs

## Register User

### Endpoint

```
POST /auth/register
```

### Request Body

```json
{
  "name": "Nandu",
  "email": "nandu@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```
POST /auth/login
```

### Request Body

```json
{
  "email": "nandu@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```

---

# EXPENSE APIs

All Expense APIs require JWT.

## Create Expense

```
POST /expenses
```

### Request

```json
{
  "category": "Food",
  "amount": 250,
  "description": "Lunch",
  "date": "2025-07-18T12:00:00"
}
```

---

## Get Expenses

```
GET /expenses
```

---

## Update Expense

```
PUT /expenses/{expense_id}
```

### Request

```json
{
  "category": "Food",
  "amount": 300,
  "description": "Dinner",
  "date": "2025-07-18T18:00:00"
}
```

---

## Delete Expense

```
DELETE /expenses/{expense_id}
```

---

# GOAL APIs

All Goal APIs require JWT.

## Create Goal

```
POST /goals
```

### Request

```json
{
  "title": "Buy Laptop",
  "target_amount": 80000,
  "current_amount": 15000
}
```

---

## Get Goals

```
GET /goals
```

---

## Update Goal

```
PUT /goals/{goal_id}
```

### Request

```json
{
  "title": "Buy Laptop",
  "target_amount": 90000,
  "current_amount": 25000
}
```

---

## Delete Goal

```
DELETE /goals/{goal_id}
```

---

# PORTFOLIO APIs

All Portfolio APIs require JWT.

## Create Portfolio Item

```
POST /portfolio
```

### Request

```json
{
  "asset_name": "TCS",
  "asset_type": "Stock",
  "amount": 10000
}
```

---

## Get Portfolio

```
GET /portfolio
```

---

## Update Portfolio

```
PUT /portfolio/{portfolio_id}
```

### Request

```json
{
  "asset_name": "TCS",
  "asset_type": "Stock",
  "amount": 15000
}
```

---

## Delete Portfolio

```
DELETE /portfolio/{portfolio_id}
```

---

# Frontend Instructions

1. Register user.
2. Login user.
3. Save access token.
4. Store token in localStorage.
5. Send:

```
Authorization: Bearer TOKEN
```

with every protected request.

---

# Suggested Frontend Pages

### Authentication

* Login Page
* Register Page

### Dashboard

* Summary Cards
* Charts

### Expenses

* Add Expense
* View Expenses
* Edit Expense
* Delete Expense

### Goals

* Add Goal
* View Goals
* Edit Goal
* Delete Goal

### Portfolio

* Add Portfolio Item
* View Portfolio
* Edit Portfolio Item
* Delete Portfolio Item

---

# Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Notes

* Backend implemented using FastAPI.
* JWT authentication enabled.
* Protected routes enabled.
* MongoDB Atlas used.
* No refresh tokens implemented.
* Token expiration is sufficiently long for demo purposes.

---


# Personal Finance Advisor Backend Documentation

---

# Project Structure

```text
personal-finance-advisor/
│
├── client/                 ← React frontend (Member 1)
│
├── server/                 ← Backend (Member 2)
│   │
│   ├── app/
│   │   │
│   │   ├── database/
│   │   │     └── mongo.py
│   │   │
│   │   ├── routes/
│   │   │     ├── auth.py
│   │   │     ├── expenses.py
│   │   │     ├── goals.py
│   │   │     └── portfolio.py
│   │   │
│   │   ├── schemas/
│   │   │     ├── user_schema.py
│   │   │     ├── expense_schema.py
│   │   │     ├── goal_schema.py
│   │   │     └── portfolio_schema.py
│   │   │
│   │   ├── utils/
│   │   │     └── auth.py
│   │   │
│   │   └── models/
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── ml-service/             ← Machine Learning Service (Member 3)
│
└── docs/
```

---

# Responsibility Distribution

## Member 1 - Frontend

Responsible for:

* Login page
* Register page
* Dashboard UI
* Expense pages
* Goal pages
* Portfolio pages
* Styling and responsiveness

Folder:

```text
client/
```

---

## Member 2 - Backend (Completed)

Responsible for:

* FastAPI server
* MongoDB connection
* JWT authentication
* User APIs
* Expense APIs
* Goal APIs
* Portfolio APIs

Folder:

```text
server/
```

---

## Member 3 - Machine Learning

Responsible for:

* Risk profiling model
* Expense prediction model
* Recommendation algorithm

Folder:

```text
ml-service/
```

Backend and ML service communicate using REST APIs.

---

## Member 4 - Analytics & Integration

Responsible for:

* Charts
* Dashboard analytics
* SIP calculator
* Connecting frontend to backend
* Connecting backend to ML service
* Testing

---

# Backend File Explanation

## main.py

Main entry point of FastAPI.

Responsibilities:

* Start server.
* Register routes.
* Expose APIs.

---

## database/mongo.py

Contains MongoDB connection.

Purpose:

* Connect to MongoDB Atlas.
* Provide database object.

Example usage:

```python
db.users.find()
db.expenses.find()
```

---

## routes/auth.py

Handles:

* Register user
* Login user
* JWT generation

Endpoints:

```text
POST /auth/register
POST /auth/login
```

---

## routes/expenses.py

Handles expense operations.

Endpoints:

```text
POST /expenses
GET /expenses
PUT /expenses/{id}
DELETE /expenses/{id}
```

---

## routes/goals.py

Handles goal operations.

Endpoints:

```text
POST /goals
GET /goals
PUT /goals/{id}
DELETE /goals/{id}
```

---

## routes/portfolio.py

Handles portfolio operations.

Endpoints:

```text
POST /portfolio
GET /portfolio
PUT /portfolio/{id}
DELETE /portfolio/{id}
```

---

## schemas/

Contains request body structures.

Example:

```python
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
```

Purpose:

* Validate incoming data.

---

## utils/auth.py

Contains:

* Password hashing
* Password verification
* JWT token creation
* Token verification

Purpose:

* Security logic.

---

# For Frontend Developers

### Register

Call:

```text
POST /auth/register
```

### Login

Call:

```text
POST /auth/login
```

Save:

```javascript
access_token
```

Store inside:

```javascript
localStorage
```

For every request:

```javascript
headers: {
    Authorization: `Bearer ${token}`
}
```

---


