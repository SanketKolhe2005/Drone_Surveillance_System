from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    # Default login credentials
    if username == "admin" and password == "admin123":

        return jsonify({
            "status": "success",
            "message": "Login Successful",
            "username": username
        })

    else:

        return jsonify({
            "status": "failed",
            "message": "Invalid Username or Password"
        }), 401


@auth_bp.route('/logout', methods=['GET'])
def logout():

    return jsonify({
        "status": "success",
        "message": "Logout Successful"
    })