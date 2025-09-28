from datetime import datetime
from bson.objectid import ObjectId
from db import items_col, users_col

class Item:
    @staticmethod
    def create_item(user_id, item_data):
        """Create a new item"""
        try:
            item = {
                "user_id": ObjectId(user_id),
                "title": item_data.get("title"),
                "description": item_data.get("description"),
                "category": item_data.get("category"),
                "condition": item_data.get("condition"),
                "location": item_data.get("location"),
                "images": item_data.get("images", []),
                "status": "available",  # available, exchanged, removed
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "likes": [],
                "likes_count": 0
            }
            result = items_col.insert_one(item)
            return {"message": "Item created successfully", "item_id": str(result.inserted_id)}, 200
        except Exception as e:
            return {"error": f"Failed to create item: {str(e)}"}, 400
    
    @staticmethod
    def get_items_for_user(user_id, exclude_user=True):
        """Get items for browsing (excluding user's own items)"""
        try:
            query = {"status": "available"}
            if exclude_user:
                query["user_id"] = {"$ne": ObjectId(user_id)}
            
            items = list(items_col.find(query).sort("created_at", -1))
            
            # Convert ObjectId to string and add user info
            for item in items:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
                # Get user info for each item
                user = users_col.find_one({"_id": ObjectId(item["user_id"])})
                if user:
                    item["owner"] = {
                        "username": user.get("username"),
                        "profile": user.get("profile", {})
                    }
            
            return items, 200
        except Exception as e:
            return [], 400
    
    @staticmethod
    def get_user_items(user_id):
        """Get items posted by a specific user"""
        try:
            items = list(items_col.find({"user_id": ObjectId(user_id)}).sort("created_at", -1))
            for item in items:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
            return items, 200
        except Exception as e:
            return [], 400
    
    @staticmethod
    def get_item_by_id(item_id):
        """Get a specific item by ID"""
        try:
            item = items_col.find_one({"_id": ObjectId(item_id)})
            if item:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
                # Get owner info
                user = users_col.find_one({"_id": ObjectId(item["user_id"])})
                if user:
                    item["owner"] = {
                        "username": user.get("username"),
                        "profile": user.get("profile", {})
                    }
                return item, 200
            else:
                return None, 404
        except Exception as e:
            return None, 400
    
    @staticmethod
    def like_item(item_id, user_id):
        """Like an item"""
        try:
            # Check if user already liked this item
            item = items_col.find_one({"_id": ObjectId(item_id)})
            if not item:
                return {"error": "Item not found"}, 404
            
            if user_id in item.get("likes", []):
                return {"message": "Already liked"}, 200
            
            # Add like
            result = items_col.update_one(
                {"_id": ObjectId(item_id)},
                {
                    "$push": {"likes": user_id},
                    "$inc": {"likes_count": 1}
                }
            )
            
            if result.modified_count > 0:
                return {"message": "Item liked successfully"}, 200
            else:
                return {"error": "Failed to like item"}, 400
        except Exception as e:
            return {"error": f"Failed to like item: {str(e)}"}, 400
    
    @staticmethod
    def unlike_item(item_id, user_id):
        """Unlike an item"""
        try:
            result = items_col.update_one(
                {"_id": ObjectId(item_id)},
                {
                    "$pull": {"likes": user_id},
                    "$inc": {"likes_count": -1}
                }
            )
            
            if result.modified_count > 0:
                return {"message": "Item unliked successfully"}, 200
            else:
                return {"error": "Failed to unlike item"}, 400
        except Exception as e:
            return {"error": f"Failed to unlike item: {str(e)}"}, 400
    
    @staticmethod
    def pass_item(item_id, user_id):
        """Pass on an item (for tracking purposes)"""
        try:
            # For now, just return success - we could track passes if needed
            return {"message": "Item passed"}, 200
        except Exception as e:
            return {"error": f"Failed to pass item: {str(e)}"}, 400
    
    @staticmethod
    def get_liked_items(user_id):
        """Get items liked by a user"""
        try:
            items = list(items_col.find({"likes": user_id, "status": "available"}).sort("created_at", -1))
            for item in items:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
                # Get owner info
                user = users_col.find_one({"_id": ObjectId(item["user_id"])})
                if user:
                    item["owner"] = {
                        "username": user.get("username"),
                        "profile": user.get("profile", {})
                    }
            return items, 200
        except Exception as e:
            return [], 400
    
    @staticmethod
    def get_mutual_likes(user_id):
        """Get items where both users liked each other's items"""
        try:
            # Get items liked by the user
            liked_items = list(items_col.find({"likes": user_id, "status": "available"}))
            
            # Get items posted by the user
            user_items = list(items_col.find({"user_id": ObjectId(user_id), "status": "available"}))
            
            matches = []
            
            for liked_item in liked_items:
                liked_item_id = str(liked_item["_id"])
                liked_item_owner = str(liked_item["user_id"])
                
                # Check if the owner of the liked item also liked any of user's items
                for user_item in user_items:
                    if liked_item_owner in user_item.get("likes", []):
                        # This is a mutual match!
                        match = {
                            "match_id": f"{liked_item_id}_{user_item['_id']}",
                            "liked_item": {
                                "id": liked_item_id,
                                "title": liked_item["title"],
                                "description": liked_item["description"],
                                "images": liked_item.get("images", []),
                                "owner": liked_item.get("owner", {})
                            },
                            "user_item": {
                                "id": str(user_item["_id"]),
                                "title": user_item["title"],
                                "description": user_item["description"],
                                "images": user_item.get("images", [])
                            },
                            "matched_at": datetime.utcnow(),
                            "status": "new"  # new, chatting, completed
                        }
                        matches.append(match)
            
            return matches, 200
        except Exception as e:
            return [], 400
    
    @staticmethod
    def update_item_status(item_id, status):
        """Update item status (available, exchanged, removed)"""
        try:
            result = items_col.update_one(
                {"_id": ObjectId(item_id)},
                {
                    "$set": {
                        "status": status,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count > 0:
                return {"message": "Item status updated successfully"}, 200
            else:
                return {"error": "Failed to update item status"}, 400
        except Exception as e:
            return {"error": f"Failed to update item status: {str(e)}"}, 400
