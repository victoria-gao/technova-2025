
from db import items_col, users_col
from typing import List
from bson import ObjectId
from gemini import generate_tags, embed_text

def add_item(owner_id: str, title: str, description: str, price: float | None = None) -> str:
    """Add a new item with auto-generated tags and embeddings"""
    # Generate tags and embedding using Gemini
    tags = generate_tags(title, description)
    embedding = embed_text(tags)
    
    doc = {
        "owner_id": owner_id,
        "title": title,
        "description": description,
        "price": price,
        "tags": tags,
        "embedding": embedding,
    }
    _id = items_col.insert_one(doc).inserted_id
    return str(_id)

def add_item_with_tags(owner_id: str, title: str, description: str, price: float | None,
                       tags: List[str], embedding: List[float]) -> str:
    """Add item with pre-generated tags and embeddings"""
    doc = {
        "owner_id": owner_id,
        "title": title,
        "description": description,
        "price": price,
        "tags": tags,
        "embedding": embedding,
    }
    _id = items_col.insert_one(doc).inserted_id
    return str(_id)

def list_items_basic():
    """Get all items with basic fields"""
    items = []
    for d in items_col.find({}, {"embedding": 1, "title": 1, "tags": 1, "owner_id": 1, "price": 1, "description": 1}):
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

def update_item_status(item_id: str, status: str):
    """Update item status (available, exchanged, removed)"""
    result = items_col.update_one(
        {"_id": ObjectId(item_id)}, 
        {"$set": {"status": status}}
    )
    return result.modified_count > 0
