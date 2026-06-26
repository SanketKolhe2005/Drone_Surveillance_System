from flask import Blueprint, Response, jsonify, send_from_directory
import cv2
from ultralytics import YOLO
from datetime import datetime
import os
import time

camera_bp = Blueprint("camera", __name__)

# ==========================
# Load YOLO Model
# ==========================
model = YOLO("yolov8m.pt")

# ==========================
# Lists
# ==========================
detection_history = []
alerts = []
last_detection_time = {}

# ==========================
# Create folders
# ==========================
os.makedirs("detections", exist_ok=True)
os.makedirs("recordings", exist_ok=True)

# ==========================
# Camera
# ==========================
cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# ==========================
# FPS Variables
# ==========================
prev_frame_time = 0
new_frame_time = 0

# ==========================
# Video Writer
# ==========================
video_writer = None
recording = False
record_start_time = 0

# ==========================
# Main Camera Function
# ==========================
def generate_frames():

    global prev_frame_time
    global video_writer
    global recording
    global record_start_time

    while True:

        success, frame = cap.read()

        if not success:
            print("Camera not working")
            break

        # ==========================
        # Run YOLO
        # ==========================
        results = model.predict(
            frame,
            conf=0.5,
            imgsz=960,
            verbose=False
        )

        current_time = time.time()

        # ==========================
        # Counters
        # ==========================
        person_count = 0
        car_count = 0
        truck_count = 0
        bus_count = 0
        bicycle_count = 0
        motorcycle_count = 0
        # ==========================
        # Process Detections
        # ==========================
        person_detected = False

        for result in results:

            boxes = result.boxes

            for box in boxes:

                cls = int(box.cls[0])
                confidence = float(box.conf[0])
                object_name = model.names[cls]

                if confidence < 0.60:
                    continue

                # Count objects
                if object_name == "person":
                    person_count += 1
                    person_detected = True

                elif object_name == "car":
                    car_count += 1

                elif object_name == "truck":
                    truck_count += 1

                elif object_name == "bus":
                    bus_count += 1

                elif object_name == "bicycle":
                    bicycle_count += 1

                elif object_name == "motorcycle":
                    motorcycle_count += 1

                # Prevent duplicate history entries
                if (
                    object_name in last_detection_time
                    and current_time - last_detection_time[object_name] < 3
                ):
                    continue

                last_detection_time[object_name] = current_time

                filename = f"{object_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"

                filepath = os.path.join("detections", filename)

                cv2.imwrite(filepath, frame)

                detection_history.append({
                    "object_name": object_name,
                    "confidence": round(confidence, 2),
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "image": filename
                })

                if len(detection_history) > 20:
                    detection_history.pop(0)

                if object_name in [
                    "person",
                    "car",
                    "truck",
                    "bus",
                    "motorcycle",
                    "bicycle"
                ]:

                    alerts.append({
                        "message": f"{object_name.upper()} detected",
                        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    })

                    if len(alerts) > 10:
                        alerts.pop(0)

        # ==========================
        # Automatic Recording
        # ==========================
        if person_detected and not recording:

            filename = f"recordings/{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"

            fourcc = cv2.VideoWriter_fourcc(*"mp4v")

            video_writer = cv2.VideoWriter(
                filename,
                fourcc,
                20,
                (1280, 720)
            )

            recording = True
            record_start_time = current_time

            print("Recording Started")

        if recording:

            video_writer.write(frame)

            if current_time - record_start_time > 10:

                video_writer.release()

                recording = False

                print("Recording Saved")

        # ==========================
        # Draw Detections
        # ==========================
        annotated_frame = results[0].plot()

        # FPS
        new_frame_time = time.time()

        fps = (
            1 / (new_frame_time - prev_frame_time)
            if prev_frame_time
            else 0
        )

        prev_frame_time = new_frame_time

        fps = int(fps)

        # Timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        cv2.putText(
            annotated_frame,
            timestamp,
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        # FPS
        cv2.putText(
            annotated_frame,
            f"FPS : {fps}",
            (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 0, 0),
            2
        )

        # Object Counters
        cv2.putText(
            annotated_frame,
            f"Persons : {person_count}",
            (10, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        cv2.putText(
            annotated_frame,
            f"Cars : {car_count}",
            (10, 130),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        cv2.putText(
            annotated_frame,
            f"Trucks : {truck_count}",
            (10, 160),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        # Recording Status
        if recording:

            cv2.putText(
                annotated_frame,
                "REC",
                (1100, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                3
            )

        ret, buffer = cv2.imencode(".jpg", annotated_frame)

        if not ret:
            continue

        frame_bytes = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n'
            + frame_bytes +
            b'\r\n'
        )
        
# ==========================
# Live Video Feed
# ==========================
@camera_bp.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# ==========================
# Detection History
# ==========================
@camera_bp.route("/history")
def history():
    return jsonify(detection_history)


# ==========================
# Alerts
# ==========================
@camera_bp.route("/alerts")
def get_alerts():
    return jsonify(alerts)


# ==========================
# Detection Image
# ==========================
@camera_bp.route("/detections/<filename>")
def get_detection_image(filename):
    return send_from_directory(
        "detections",
        filename
    )


# ==========================
# Dashboard Stats
# ==========================
@camera_bp.route("/stats")
def get_stats():

    person_count = sum(
        1 for item in detection_history
        if item["object_name"] == "person"
    )

    vehicle_count = sum(
        1 for item in detection_history
        if item["object_name"] in [
            "car",
            "truck",
            "bus",
            "motorcycle",
            "bicycle"
        ]
    )

    return jsonify({
        "total_detections": len(detection_history),
        "total_alerts": len(alerts),
        "total_persons": person_count,
        "total_vehicles": vehicle_count,
        "camera_status": "Active",
        "model": "YOLOv8m"
    })


# ==========================
# Chart Data
# ==========================
@camera_bp.route("/chart-data")
def chart_data():

    counts = {}

    for item in detection_history:
        counts[item["object_name"]] = counts.get(item["object_name"], 0) + 1

    return jsonify([
        {
            "name": key,
            "count": value
        }
        for key, value in counts.items()
    ])