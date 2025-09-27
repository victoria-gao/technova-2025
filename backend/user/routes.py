from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
import os
from dotenv import load_dotenv

from user.models import User
#from . import user_bp
#from user.models import User

load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

user_bp = Blueprint('user', __name__)

#placeholder below



    # @user_bp.route("/signup", methods=["POST"])
    # def signup():
    #     data = request.json
    #     username = data.get("username")
    #     email = data.get("email")
    #     if not username or not email:
    #         return jsonify({"error": "Missing username or email"}), 400
    #     user_id = User.signup(username, email)  # call function from models.py
    #     return jsonify({"message": "User created", "id": user_id})

    # @user_bp.route("/users", methods=["GET"])
    # def users():
    #     users = User.get_all_users()  # call function from models.py
    #     return jsonify(users)

@user_bp.route("/google-signup", methods=["POST"])
def google_signup_route():
    """
    Frontend should POST google user info here:
    {
        "google_id": "...",
        "email": "...",
        "name": "..."
    }
    """
    data = request.json
    required_fields = ["google_id", "email", "name"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing Google user info"}), 400

    user_id = User.google_signup(data)
    return jsonify({"message": "User signed up with Google", "id": user_id})