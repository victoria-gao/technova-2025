from flask import Blueprint, request, jsonify
from .models import Item

item_bp = Blueprint('item', __name__)

@item_bp.route("/items", methods=["POST"])
def create_item():
    """Create a new item - basic version"""
    data = request.json
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    # Only require title and description
    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description required"}), 400
    
    result, status_code = Item.create_item(user_id, data)
    return jsonify(result), status_code

@item_bp.route("/items", methods=["GET"])
def get_items():
    """Get items for browsing"""
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    items, status_code = Item.get_items_for_user(user_id)
    return jsonify({"items": items}), status_code

@item_bp.route("/items/user/<user_id>", methods=["GET"])
def get_user_items(user_id):
    """Get items posted by a specific user"""
    items, status_code = Item.get_user_items(user_id)
    return jsonify({"items": items}), status_code

@item_bp.route("/items/<item_id>", methods=["GET"])
def get_item(item_id):
    """Get a specific item by ID"""
    item, status_code = Item.get_item_by_id(item_id)
    if item:
        return jsonify(item), status_code
    else:
        return jsonify({"error": "Item not found"}), 404

@item_bp.route("/items/<item_id>/like", methods=["POST"])
def like_item(item_id):
    """Like an item"""
    data = request.json
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    result, status_code = Item.like_item(item_id, user_id)
    return jsonify(result), status_code

@item_bp.route("/items/<item_id>/unlike", methods=["POST"])
def unlike_item(item_id):
    """Unlike an item"""
    data = request.json
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    result, status_code = Item.unlike_item(item_id, user_id)
    return jsonify(result), status_code

@item_bp.route("/items/liked/<user_id>", methods=["GET"])
def get_liked_items(user_id):
    """Get items liked by a user"""
    items, status_code = Item.get_liked_items(user_id)
    return jsonify({"items": items}), status_code