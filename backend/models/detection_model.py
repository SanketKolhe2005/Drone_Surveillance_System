from utils.database import db

class Detection(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    object_name = db.Column(db.String(100))

    confidence = db.Column(db.Float)

    timestamp = db.Column(db.String(100))