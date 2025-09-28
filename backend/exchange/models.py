from datetime import datetime
from bson.objectid import ObjectId
from db import exchanges_col, items_col, users_col

class Exchange:
    @staticmethod
    def create_exchange(user1_id, user2_id, item1_id, item2_id, status="pending"):
        """Create a new exchange record"""
        try:
            exchange = {
                "user1_id": ObjectId(user1_id),
                "user2_id": ObjectId(user2_id),
                "item1_id": ObjectId(item1_id),
                "item2_id": ObjectId(item2_id),
                "status": status,  # pending, confirmed, completed, cancelled
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "messages": [],
                "completion_date": None
            }
            result = exchanges_col.insert_one(exchange)
            return {"message": "Exchange created successfully", "exchange_id": str(result.inserted_id)}, 200
        except Exception as e:
            return {"error": f"Failed to create exchange: {str(e)}"}, 400
    
    @staticmethod
    def get_user_exchanges(user_id):
        """Get all exchanges for a user"""
        try:
            exchanges = list(exchanges_col.find({
                "$or": [
                    {"user1_id": ObjectId(user_id)},
                    {"user2_id": ObjectId(user_id)}
                ]
            }).sort("created_at", -1))
            
            # Convert ObjectIds to strings and add item details
            for exchange in exchanges:
                exchange["_id"] = str(exchange["_id"])
                exchange["user1_id"] = str(exchange["user1_id"])
                exchange["user2_id"] = str(exchange["user2_id"])
                exchange["item1_id"] = str(exchange["item1_id"])
                exchange["item2_id"] = str(exchange["item2_id"])
                
                # Get item details
                item1 = items_col.find_one({"_id": ObjectId(exchange["item1_id"])})
                item2 = items_col.find_one({"_id": ObjectId(exchange["item2_id"])})
                
                if item1:
                    exchange["item1_details"] = {
                        "title": item1["title"],
                        "description": item1["description"],
                        "images": item1.get("images", [])
                    }
                
                if item2:
                    exchange["item2_details"] = {
                        "title": item2["title"],
                        "description": item2["description"],
                        "images": item2.get("images", [])
                    }
                
                # Get user details
                user1 = users_col.find_one({"_id": ObjectId(exchange["user1_id"])})
                user2 = users_col.find_one({"_id": ObjectId(exchange["user2_id"])})
                
                if user1:
                    exchange["user1_details"] = {
                        "username": user1["username"],
                        "profile": user1.get("profile", {})
                    }
                
                if user2:
                    exchange["user2_details"] = {
                        "username": user2["username"],
                        "profile": user2.get("profile", {})
                    }
            
            return exchanges, 200
        except Exception as e:
            return [], 400
    
    @staticmethod
    def update_exchange_status(exchange_id, status):
        """Update exchange status"""
        try:
            update_data = {
                "status": status,
                "updated_at": datetime.utcnow()
            }
            
            if status == "completed":
                update_data["completion_date"] = datetime.utcnow()
            
            result = exchanges_col.update_one(
                {"_id": ObjectId(exchange_id)},
                {"$set": update_data}
            )
            
            if result.modified_count > 0:
                return {"message": "Exchange status updated successfully"}, 200
            else:
                return {"error": "Failed to update exchange status"}, 400
        except Exception as e:
            return {"error": f"Failed to update exchange status: {str(e)}"}, 400
    
    @staticmethod
    def add_exchange_message(exchange_id, user_id, message):
        """Add a message to an exchange"""
        try:
            message_data = {
                "user_id": user_id,
                "message": message,
                "timestamp": datetime.utcnow()
            }
            
            result = exchanges_col.update_one(
                {"_id": ObjectId(exchange_id)},
                {"$push": {"messages": message_data}}
            )
            
            if result.modified_count > 0:
                return {"message": "Message added successfully"}, 200
            else:
                return {"error": "Failed to add message"}, 400
        except Exception as e:
            return {"error": f"Failed to add message: {str(e)}"}, 400
    
    @staticmethod
    def get_exchange_by_id(exchange_id):
        """Get a specific exchange by ID"""
        try:
            exchange = exchanges_col.find_one({"_id": ObjectId(exchange_id)})
            if exchange:
                exchange["_id"] = str(exchange["_id"])
                exchange["user1_id"] = str(exchange["user1_id"])
                exchange["user2_id"] = str(exchange["user2_id"])
                exchange["item1_id"] = str(exchange["item1_id"])
                exchange["item2_id"] = str(exchange["item2_id"])
                return exchange, 200
            else:
                return None, 404
        except Exception as e:
            return None, 400
    
    @staticmethod
    def complete_exchange(exchange_id):
        """Mark an exchange as completed and update item statuses"""
        try:
            exchange = exchanges_col.find_one({"_id": ObjectId(exchange_id)})
            if not exchange:
                return {"error": "Exchange not found"}, 404
            
            # Update exchange status
            result = exchanges_col.update_one(
                {"_id": ObjectId(exchange_id)},
                {
                    "$set": {
                        "status": "completed",
                        "completion_date": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count > 0:
                # Update item statuses to exchanged
                exchanges_col.update_many(
                    {"_id": {"$in": [exchange["item1_id"], exchange["item2_id"]]}},
                    {"$set": {"status": "exchanged", "updated_at": datetime.utcnow()}}
                )
                
                # Update user stats
                exchanges_col.update_many(
                    {"_id": {"$in": [exchange["user1_id"], exchange["user2_id"]]}},
                    {"$inc": {"stats.items_exchanged": 1}}
                )
                
                return {"message": "Exchange completed successfully"}, 200
            else:
                return {"error": "Failed to complete exchange"}, 400
        except Exception as e:
            return {"error": f"Failed to complete exchange: {str(e)}"}, 400
