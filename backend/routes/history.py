from flask import Blueprint, jsonify

from models.detection_model import Detection

history_bp = Blueprint('history', __name__)

@history_bp.route('/history')

def get_history():

    detections = Detection.query.all()

    data = []

    for d in detections:

        data.append({
            "object_name": d.object_name,
            "confidence": d.confidence,
            "timestamp": d.timestamp
        })

    return jsonify(data)