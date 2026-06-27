def recommend_portfolio(risk_profile):

    if risk_profile == "Conservative":
        return {
            "equity": 20,
            "debt": 70,
            "gold": 10,
            "recommended_funds": [
                "Liquid Fund",
                "Short Duration Debt Fund"
            ]
        }

    elif risk_profile == "Moderate":
        return {
            "equity": 50,
            "debt": 40,
            "gold": 10,
            "recommended_funds": [
                "Large Cap Index Fund",
                "Balanced Advantage Fund"
            ]
        }

    else:
        return {
            "equity": 80,
            "debt": 15,
            "gold": 5,
            "recommended_funds": [
                "Flexi Cap Fund",
                "Mid Cap Fund"
            ]
        }