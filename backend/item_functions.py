
from db import items_col, users_col
from typing import List
from bson import ObjectId

# Try to import Gemini functions, fall back to mock functions if not available
try:
    from gemini import generate_tags, embed_text
except ImportError:
    print("Warning: Gemini not available, using mock functions")
    
    def generate_tags(title, description):
        """Mock function to generate tags without Gemini"""
        keywords = (title + " " + description).lower()
        tags = []
        
        if any(word in keywords for word in ["leather", "jacket", "coat"]):
            tags.append("leather")
        if any(word in keywords for word in ["vintage", "old", "retro"]):
            tags.append("vintage")
        if any(word in keywords for word in ["winter", "cold", "warm"]):
            tags.append("winter")
        if any(word in keywords for word in ["size", "small", "medium", "large"]):
            tags.append("clothing")
        if any(word in keywords for word in ["book", "novel", "textbook"]):
            tags.append("book")
        if any(word in keywords for word in ["electronic", "phone", "laptop", "computer"]):
            tags.append("electronics")
        
        return tags if tags else ["general"]
    
    def embed_text(tags):
        """Mock function to generate embeddings without Gemini"""
        embedding = []
        for tag in tags:
            hash_val = hash(tag) % 1000
            embedding.append(hash_val / 1000.0)
        
        while len(embedding) < 10:
            embedding.append(0.0)
        
        return embedding[:10]

def add_item(owner_id: str, title: str, description: str, price: float | None = None) -> str:
    """Add a new item - basic version"""
    doc = {
        "owner_id": owner_id,
        "title": title,
        "description": description,
        "price": price,
    }
    _id = items_col.insert_one(doc).inserted_id
    return str(_id)

# Removed add_item_with_tags - keeping it simple

def list_items_basic():
    """Get all items with basic fields"""
    items = []
    for d in items_col.find({}, {"title": 1, "owner_id": 1, "price": 1, "description": 1}):
        d["_id"] = str(d["_id"])
        items.append(d)
    return items

def get_item(item_id: str):
    """Get a specific item by ID"""
    d = items_col.find_one({"_id": ObjectId(item_id)})
    if d:
        d["_id"] = str(d["_id"])
    return d

def get_user_items(user_id: str):
    """Get all items posted by a specific user"""
    items = []
    for d in items_col.find({"owner_id": user_id}):
        d["_id"] = str(d["_id"])
        items.append(d)
    return items

# Removed update_item_status - keeping it simple
