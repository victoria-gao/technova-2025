from flask import Blueprint, request, jsonify
# from .models import google_signup
# from google.oauth2 import id_token
# from google.auth.transport import requests as grequests
# import os
# from dotenv import load_dotenv

from user.models import User
#from . import user_bp
#from user.models import User

# load_dotenv()
# GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

user_bp = Blueprint('user', __name__)

#placeholder below



@user_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    if not username or not email:
        return jsonify({"error": "Missing username or email"}), 400
    user_id = User.signup(username, email)  # call function from models.py
    return jsonify({"message": "User created", "id": user_id})

@user_bp.route("/users", methods=["GET"])
def users():
    users = User.get_all_users()  # call function from models.py
    return jsonify(users)

