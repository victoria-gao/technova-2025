# Placeholder for now — you can add a real database model later.
# Keeps your import from breaking.
from flask import Flask , jsonify
from flask_pymongo import PyMongo
from flask import current_app
from db import collection
from bson.objectid import ObjectId
mongo = PyMongo()
class User:
    def signup(username, email):
        """Insert a new user into MongoDB"""
        user = {"username": username, "email": email}
        result = collection.insert_one(user)
        return str(result.inserted_id)

    def get_all_users():
        """Return all users as a list of dicts"""
        users = list(collection.find())
        for u in users:
            u["_id"] = str(u["_id"])
        return users

# class User:
#     def google_signup(google_user_info):
    
#     # google_user_info = {
#     #     "google_id": str,
#     #     "email": str,
#     #     "name": str
#     # }
    
#     existing = collection.find_one({"google_id": google_user_info["google_id"]})
#     if existing:
#         return str(existing["_id"])  # user already exists

#     result = collection.insert_one(google_user_info)
#     return str(result.inserted_id)
        
# def get_user_by_google_id(google_id):
#     return collection.find_one({"google_id": google_id})
#     # def __init__(self, username):
#     #     self.username = username

#     # def __repr__(self):
#     #     return f"<User {self.username}>"
