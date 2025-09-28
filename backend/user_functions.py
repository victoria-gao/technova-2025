
from db import users_col
from bson import ObjectId

def get_or_create_user(user_id: str):
    """Get existing user or create new one with default preferences"""
    user = users_col.find_one({"user_id": user_id})
    if user: 
        return user
    
    user = {
        "user_id": user_id,
        "pref_vec": None,
        "liked_item_ids": [],
        "disliked_item_ids": [],
        "liked_tags": [],
        "seen_item_ids": [],
    }
    users_col.insert_one(user)
    return user

def save_user(user: dict):
    """Save user data to database"""
    users_col.update_one({"user_id": user["user_id"]}, {"$set": user})

def get_user_by_id(user_id: str):
    """Get user by ID"""
    user = users_col.find_one({"user_id": user_id})
    if user:
        user["_id"] = str(user["_id"])
    return user

def update_user_preferences(user_id: str, liked_item_ids: list = None, disliked_item_ids: list = None, 
                          liked_tags: list = None, seen_item_ids: list = None):
    """Update user preferences"""
    user = get_or_create_user(user_id)
    
    if liked_item_ids is not None:
        user["liked_item_ids"] = liked_item_ids
    if disliked_item_ids is not None:
        user["disliked_item_ids"] = disliked_item_ids
    if liked_tags is not None:
        user["liked_tags"] = liked_tags
    if seen_item_ids is not None:
        user["seen_item_ids"] = seen_item_ids
    
    save_user(user)
    return user
