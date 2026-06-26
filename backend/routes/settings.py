from flask import Blueprint, jsonify

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings', methods=['GET'])
def get_settings():

    settings_data = {
        "camera_status": "Connected",
        "model": "YOLOv8",
        "detection_mode": "Active",
        "resolution": "640x480",
        "system_status": "Running"
    }

    return jsonify(settings_data)