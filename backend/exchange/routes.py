from flask import Blueprint, request, jsonify
from .models import Exchange

exchange_bp = Blueprint('exchange', __name__)

@exchange_bp.route("/exchanges", methods=["POST"])
def create_exchange():
    """Create a new exchange"""
    data = request.json
    user1_id = data.get("user1_id")
    user2_id = data.get("user2_id")
    item1_id = data.get("item1_id")
    item2_id = data.get("item2_id")
    
    if not all([user1_id, user2_id, item1_id, item2_id]):
        return jsonify({"error": "All fields required"}), 400
    
    result, status_code = Exchange.create_exchange(user1_id, user2_id, item1_id, item2_id)
    return jsonify(result), status_code

@exchange_bp.route("/exchanges/user/<user_id>", methods=["GET"])
def get_user_exchanges(user_id):
    """Get all exchanges for a user"""
    exchanges, status_code = Exchange.get_user_exchanges(user_id)
    return jsonify({"exchanges": exchanges}), status_code

@exchange_bp.route("/exchanges/<exchange_id>", methods=["GET"])
def get_exchange(exchange_id):
    """Get a specific exchange by ID"""
    exchange, status_code = Exchange.get_exchange_by_id(exchange_id)
    if exchange:
        return jsonify(exchange), status_code
    else:
        return jsonify({"error": "Exchange not found"}), 404

@exchange_bp.route("/exchanges/<exchange_id>/status", methods=["PUT"])
def update_exchange_status(exchange_id):
    """Update exchange status"""
    data = request.json
    status = data.get("status")
    
    if not status:
        return jsonify({"error": "Status required"}), 400
    
    valid_statuses = ["pending", "confirmed", "completed", "cancelled"]
    if status not in valid_statuses:
        return jsonify({"error": "Invalid status"}), 400
    
    result, status_code = Exchange.update_exchange_status(exchange_id, status)
    return jsonify(result), status_code

@exchange_bp.route("/exchanges/<exchange_id>/message", methods=["POST"])
def add_exchange_message(exchange_id):
    """Add a message to an exchange"""
    data = request.json
    user_id = data.get("user_id")
    message = data.get("message")
    
    if not user_id or not message:
        return jsonify({"error": "User ID and message required"}), 400
    
    result, status_code = Exchange.add_exchange_message(exchange_id, user_id, message)
    return jsonify(result), status_code

@exchange_bp.route("/exchanges/<exchange_id>/complete", methods=["POST"])
def complete_exchange(exchange_id):
    """Mark an exchange as completed"""
    result, status_code = Exchange.complete_exchange(exchange_id)
    return jsonify(result), status_code