from flask import Flask
from flask_cors import CORS

from utils.database import db
from routes.history import history_bp
from routes.camera import camera_bp

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///surveillance.db'

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(camera_bp)
app.register_blueprint(history_bp)
@app.route('/')
def home():
    return {
        "message": "Backend Running"
    }

if __name__ == '__main__':
    app.run(debug=True)