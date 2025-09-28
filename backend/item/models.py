from datetime import datetime
from bson.objectid import ObjectId
from db import items_col

class Item:
    @staticmethod
    def create_item(user_id, item_data):
        """Create a new item - basic version"""
        try:
            item = {
                "user_id": ObjectId(user_id),
                "title": item_data.get("title"),
                "description": item_data.get("description"),
                "price": item_data.get("price"),
                "created_at": datetime.utcnow(),
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
            query = {}
            if exclude_user:
                query["user_id"] = {"$ne": ObjectId(user_id)}
            
            items = list(items_col.find(query).sort("created_at", -1))
            
            # Convert ObjectId to string
            for item in items:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
            
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
    def get_liked_items(user_id):
        """Get items liked by a user"""
        try:
            items = list(items_col.find({"likes": user_id}).sort("created_at", -1))
            for item in items:
                item["_id"] = str(item["_id"])
                item["user_id"] = str(item["user_id"])
            return items, 200
        except Exception as e:
            return [], 400