from flask import Blueprint, request, jsonify
# from .models import google_signup
# from google.oauth2 import id_token
# from google.auth.transport import requests as grequests
# import os
# from dotenv import load_dotenv
from db import users_col, exchanges_col
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
    password = data.get("password")
    
    if not username or not email or not password:
        return jsonify({"error": "Missing username, email, or password"}), 400
    
    result, status_code = User.signup(username, email, password)
    return jsonify(result), status_code

@user_bp.route("/login", methods=["POST"])
@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # safer than request.json
    result, status = User.login(data)  # use your User class login method
    return jsonify(result), status


@user_bp.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    user = User.get_user_by_id(user_id)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route("/user/<user_id>/profile", methods=["PUT"])
def update_user_profile(user_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON"}), 400
    
    success = User.update_profile(user_id, data)
    if success:
        return jsonify({"message": "Profile updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update profile"}), 400

@user_bp.route("/user/<user_id>/exchanges", methods=["GET"])
def get_user_exchanges(user_id):
    exchanges = list(exchanges_col.find({
        "$or": [{"user1_id": user_id}, {"user2_id": user_id}]
    }))
    for ex in exchanges:
        ex["_id"] = str(ex["_id"])
    return jsonify(exchanges)