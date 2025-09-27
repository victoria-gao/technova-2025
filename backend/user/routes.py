from flask import Blueprint,Flask, request, jsonify
#from user.models import User

user_bp = Blueprint('user', __name__)

#placeholder below
from . import user_bp

@user_bp.route("/profile")
def profile():
    return "User Profile Page"

