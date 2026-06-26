from flask import Blueprint, jsonify
from models.detection_model import Detection

detections_bp = Blueprint('detections', __name__)

@detections_bp.route('/detections', methods=['GET'])
def get_detections():

    detections = Detection.query.all()

    data = []

    for detection in detections:

        data.append({
            "id": detection.id,
            "object_name": detection.object_name,
            "confidence": detection.confidence,
            "timestamp": detection.timestamp
        })

    return jsonify(data)
