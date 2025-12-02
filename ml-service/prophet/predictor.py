import pandas as pd
from prophet import Prophet
from typing import List, Dict, Any


def prepare_daily_series(expenses: List[Dict[str, Any]]) -> pd.DataFrame:
    if not expenses:
        return pd.DataFrame(columns=["ds", "y"])
    
    df = pd.DataFrame(expenses)
    
    if "date" not in df.columns or "amount" not in df.columns:
        raise ValueError("expenses must include 'date' and 'amount' fields")
    
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    daily = df.groupby(df["date"].dt.date)["amount"].sum().reset_index()
    daily["ds"] = pd.to_datetime(daily["date"])
    daily["y"] = daily["amount"]
    daily = daily[["ds", "y"]].sort_values("ds")
    
    return daily


def fit_and_forecast(daily_df: pd.DataFrame, periods: int = 30) -> Dict:
    if daily_df.shape[0] < 5:
        return {"error": "not_enough_data", "rows": int(daily_df.shape[0])}
    
    model = Prophet(daily_seasonality=True, weekly_seasonality=True, yearly_seasonality=True)
    model.fit(daily_df)
    
    future = model.make_future_dataframe(periods=periods, freq='D')
    forecast = model.predict(future)
    
    last_forecast = forecast.tail(periods).reset_index(drop=True)
    
    result = {
        "forecast_tail": last_forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].to_dict(orient="records"),
        "future_len": int(periods)
    }
    
    return result


def compute_next_month_summary(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}
    
    df = pd.DataFrame(expenses)
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    monthly = df.groupby(pd.Grouper(key="date", freq="M"))["amount"].sum().reset_index()
    monthly = monthly.rename(columns={"date": "ds", "amount": "y"})
    monthly = monthly.sort_values("ds")
    
    if monthly.shape[0] < 5:
        return {"error": "not_enough_months", "rows": int(monthly.shape[0])}
    
    model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
    model.fit(monthly)
    
    future = model.make_future_dataframe(periods=3, freq='M')
    forecast = model.predict(future)
    
    next_row = forecast[forecast['ds'] > monthly['ds'].max()].head(1).iloc[0]
    last_val = monthly['y'].iloc[-1]
    predicted = float(next_row['yhat'])
    
    trend_percent = None
    if last_val != 0:
        trend_percent = round(((predicted - last_val) / last_val) * 100, 2)
    
    return {
        "predicted_next_month": round(predicted, 2),
        "predicted_lower": round(float(next_row['yhat_lower']), 2),
        "predicted_upper": round(float(next_row['yhat_upper']), 2),
        "last_month_actual": round(float(last_val), 2),
        "trend_percent": trend_percent,
        "forecast_next_3_months": forecast.tail(3)[["ds", "yhat", "yhat_lower", "yhat_upper"]].to_dict(orient="records")
    }


def compute_category_level_forecasts(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}
    
    df = pd.DataFrame(expenses)
    
    if "category" not in df.columns:
        return {"error": "category_field_missing"}
    
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    categories = df["category"].unique()
    result = {}
    
    for cat in categories:
        df_cat = df[df["category"] == cat]
        daily = prepare_daily_series(df_cat.to_dict(orient="records"))
        
        if len(daily) < 5:
            result[cat] = {
                "error": "not_enough_data",
                "rows": len(daily),
                "forecast_next_month": None
            }
            continue
        
        forecast_data = fit_and_forecast(daily, periods=30)
        
        if "error" in forecast_data:
            result[cat] = forecast_data
            continue
        
        next_30 = forecast_data["forecast_tail"]
        next_month_total = sum([d["yhat"] for d in next_30])
        
        result[cat] = {
            "forecast_next_month": round(next_month_total, 2),
            "forecast_daily": next_30,
            "status": "ok"
        }
    
    return result
