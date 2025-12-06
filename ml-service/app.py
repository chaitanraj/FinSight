from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import (
    daily_series,
    fit_and_forecast,
    monthly_predict,
    category_predict
)
from anomaly import detect_anomaly

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
        
        result = monthly_predict(expenses)
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
        
        result = category_predict(expenses)
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
        
        daily_df = daily_series(expenses)
        result = fit_and_forecast(daily_df, periods=30)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/detect/anomaly", methods=["POST"])
def detect_anomaly():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])

        if not expenses:
            return jsonify({"error": "expenses_required"}), 400

        result = detect_anomaly(expenses)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)