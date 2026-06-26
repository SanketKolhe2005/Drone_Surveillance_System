from flask import Blueprint, jsonify

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/alerts', methods=['GET'])
def get_alerts():

    alerts_data = [
        {
            "id": 1,
            "message": "Person detected in restricted area",
            "level": "High"
        },
        {
            "id": 2,
            "message": "Vehicle detected near boundary",
            "level": "Medium"
        },
        {
            "id": 3,
            "message": "Motion detected at night",
            "level": "Low"
        }
    ]

    return jsonify(alerts_data)