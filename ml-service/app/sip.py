def calculate_sip(monthly_investment, annual_rate, years):

    monthly_rate = annual_rate / (12 * 100)

    months = years * 12

    maturity = monthly_investment * (
        ((1 + monthly_rate) ** months - 1)
        / monthly_rate
    ) * (1 + monthly_rate)

    invested = monthly_investment * months

    wealth = maturity - invested

    return {
        "monthly_investment": monthly_investment,
        "invested_amount": round(invested, 2),
        "wealth_gained": round(wealth, 2),
        "maturity_amount": round(maturity, 2)
    }