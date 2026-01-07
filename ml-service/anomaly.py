# Isolation forest 
import pandas as pd
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any

def detect_anomaly_model(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}
    
    df = pd.DataFrame(expenses)
    total_spend=df["amount"].sum();

    if "date" not in df.columns or "amount" not in df.columns or "category" not in df.columns:
        return {"error": "missing_fields"}
    
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    daily = df.groupby(df["date"].dt.date)["amount"].sum().reset_index()
    daily["ds"] = pd.to_datetime(daily["date"])
    daily = daily.sort_values("ds")
    
    if len(daily) < 10:
        return {
            "error": "not_enough_data",
            "rows": len(daily),
            "reason": "Isolation Forest requires at least ~10 samples"
        }
    
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(daily[["amount"]])
    
    daily["anomaly"] = model.predict(daily[["amount"]])
    daily["score"] = model.decision_function(daily[["amount"]])
    
    anomalies = daily[daily["anomaly"] == -1]
    total_days=len(daily)
    average=round(total_spend/total_days)

    enriched_anomalies = []

    for _, row in anomalies.iterrows():
        anomaly_date = row["date"]

        day_txns = df[df["date"].dt.date == anomaly_date]

        categories = (
            day_txns
            .groupby("category")["amount"]
            .sum()
            .reset_index()
            .to_dict(orient="records")
        )

        enriched_anomalies.append({
            "date": anomaly_date,
            "amount": row["amount"],
            "score": row["score"],
            "categories": categories
        })

    return {
        "average_expense": average,
        "anomaly_days": len(enriched_anomalies),
        "anomalies": enriched_anomalies
    }
