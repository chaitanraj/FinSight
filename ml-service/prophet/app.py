from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import (
    prepare_daily_series,
    fit_and_forecast,
    compute_next_month_summary,
    compute_category_level_forecasts
)

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Prophet API is running"}), 200


@app.route("/forecast/global", methods=["POST"])
def forecast_global():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        result = compute_next_month_summary(expenses)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/forecast/category", methods=["POST"])
def forecast_category():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        result = compute_category_level_forecasts(expenses)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/forecast/daily", methods=["POST"])
def forecast_daily():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        daily_df = prepare_daily_series(expenses)
        result = fit_and_forecast(daily_df, periods=30)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)