import hashlib
import secrets
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask import current_app
from db import users_col
from bson.objectid import ObjectId
mongo = PyMongo()

class User:
    @staticmethod
    def hash_password(password):
        salt = secrets.token_hex(16)
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return password_hash, salt
    
    @staticmethod
    def verify_password(password, stored_hash, salt):
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return password_hash == stored_hash

    @staticmethod
    def signup(username, email, password):
        #Check if username already exists
        existing_user = users_col.find_one({"username": username})
        if existing_user:
            return {"error": "Username already exists"}, 400
        
        #Check if email already exists
        existing_email = users_col.find_one({"email": email})
        if existing_email:
            return {"error": "Email already exists"}, 400
        
        #Hashes password
        password_hash, salt = User.hash_password(password)
        
        user = {
            "username": username, 
            "email": email,
            "password_hash": password_hash,
            "salt": salt,
            
            "profile": {
                "bio": "",
                "location": "",
                "avatar": ""
            },
            "stats": {
                "items_posted": 0,
                "items_exchanged": 0,
                "likes_received": 0,
                "rating": 0.0
            }
        }
        result = users_col.insert_one(user)
        return {"message": "User created successfully"}, 200

    @staticmethod
    def login(data):
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return {"error": "Email and password required"}, 400
        
        user = users_col.find_one({"email": email})
        if not user:
            return {"error": "Invalid credentials"}, 401

        #Verify password
        if User.verify_password(password, user["password_hash"], user["salt"]):
            #Remove sensitive data before returning
            user_data = {
                "user_id": str(user["_id"]),
                "username": user["username"],
                "email": user["email"],
                "profile": user.get("profile", {}),
                "stats": user.get("stats", {})
            }
            return user_data, 200
        else:
            return {"error": "Invalid credentials"}, 401
    
    @staticmethod
    def get_user_by_id(user_id):
        try:
            user = users_col.find_one({"_id": ObjectId(user_id)})
            if user:
                return {
                    "user_id": str(user["_id"]),
                    "username": user["username"],
                    "email": user["email"],
                    "profile": user.get("profile", {}),
                    "stats": user.get("stats", {})
                }
            return None
        except:
            return None
    
    @staticmethod
    def update_profile(user_id, profile_data):
        try:
            result = users_col.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"profile": profile_data}}
            )
            return result.modified_count > 0
        except:
            return False

    

#class User:
#    def google_signup(google_user_info):
    
#    #google_user_info = {
#    #    "google_id": str,
#    #    "email": str,
#    #    "name": str
#    #}
    
#    existing = users_col.find_one({"google_id": google_user_info["google_id"]})
#    if existing:
#        return str(existing["_id"])  #user already exists

#    result = users_col.insert_one(google_user_info)
#    return str(result.inserted_id)
        
#def get_user_by_google_id(google_id):
#    return users_col.find_one({"google_id": google_id})
#    #def __init__(self, username):
#    #    self.username = username

#    #def __repr__(self):
#    #    return f"<User {self.username}>"
