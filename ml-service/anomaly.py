# Isolation forest 
import pandas as pd
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any

def detect_anomaly_model(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}
    
    df = pd.DataFrame(expenses)
    
    if "date" not in df.columns or "amount" not in df.columns:
        return {"error": "missing_fields"}
    
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    daily = df.groupby(df["date"].dt.date)["amount"].sum().reset_index()
    daily["ds"] = pd.to_datetime(daily["date"])
    daily = daily[["ds", "amount"]].sort_values("ds")
    
    if len(daily) < 10:
        return {
            "error": "not_enough_data",
            "rows": len(daily),
            "reason": "Isolation Forest requires at least ~10 samples"
        }
    
    model = IsolationForest(contamination=0.2, random_state=42)
    model.fit(daily[["amount"]])
    
    daily["anomaly"] = model.predict(daily[["amount"]])
    daily["score"] = model.decision_function(daily[["amount"]])
    
    anomalies = daily[daily["anomaly"] == -1]
    
    return {
        "total_days": len(daily),
        "anomaly_days": len(anomalies),
        "anomalies": anomalies.to_dict(orient="records")
    }