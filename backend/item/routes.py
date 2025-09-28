from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
import uuid
from .models import Item

item_bp = Blueprint('item', __name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@item_bp.route("/items/upload-image", methods=["POST"])
def upload_image():
    """Upload an image for an item"""
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image selected"}), 400
    
    if file and allowed_file(file.filename):
        # Create uploads directory if it doesn't exist
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        
        # Save file
        file.save(filepath)
        
        # Return the file URL (you might want to serve this through Flask or use a CDN)
        image_url = f"/uploads/{unique_filename}"
        return jsonify({"message": "Image uploaded successfully", "image_url": image_url}), 200
    
    return jsonify({"error": "Invalid file type"}), 400

@item_bp.route("/uploads/<filename>")
def uploaded_file(filename):
    """Serve uploaded images"""
    return send_from_directory(UPLOAD_FOLDER, filename)

@item_bp.route("/items", methods=["POST"])
def create_item():
    """Create a new item"""
    data = request.json
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    required_fields = ["title", "description", "category", "condition", "location"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
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

@item_bp.route("/items/<item_id>/pass", methods=["POST"])
def pass_item(item_id):
    """Pass on an item"""
    data = request.json
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    
    result, status_code = Item.pass_item(item_id, user_id)
    return jsonify(result), status_code

@item_bp.route("/items/liked/<user_id>", methods=["GET"])
def get_liked_items(user_id):
    """Get items liked by a user"""
    items, status_code = Item.get_liked_items(user_id)
    return jsonify({"items": items}), status_code

@item_bp.route("/items/matches/<user_id>", methods=["GET"])
def get_mutual_matches(user_id):
    """Get mutual matches for a user"""
    matches, status_code = Item.get_mutual_likes(user_id)
    return jsonify({"matches": matches}), status_code

@item_bp.route("/items/<item_id>/status", methods=["PUT"])
def update_item_status(item_id):
    """Update item status"""
    data = request.json
    status = data.get("status")
    
    if not status:
        return jsonify({"error": "Status required"}), 400
    
    valid_statuses = ["available", "exchanged", "removed"]
    if status not in valid_statuses:
        return jsonify({"error": "Invalid status"}), 400
    
    result, status_code = Item.update_item_status(item_id, status)
    return jsonify(result), status_code
