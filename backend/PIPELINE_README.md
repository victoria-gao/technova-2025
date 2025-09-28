# Simplified Backend Pipeline

This document describes the **basic, beginner-level** backend pipeline with all complex features removed.

## Core Files

### `item_functions.py` - Basic Item Management
- `add_item(owner_id, title, description, price=None)` - Creates a simple item
- `list_items_basic()` - Gets all items with basic fields
- `get_item(item_id)` - Gets specific item by ID
- `get_user_items(user_id)` - Gets all items by a user

### `user_functions.py` - Basic User Management
- `get_or_create_user(user_id)` - Gets existing user or creates new one
- `save_user(user)` - Saves user data
- `get_user_by_id(user_id)` - Gets user by ID
- `update_user_preferences(user_id, ...)` - Updates user preferences

### `recommender.py` - Simple Recommendation System
- `random_feed(user_id, k=10)` - Returns random items for user
- `ranked_feed(user_id, k=10)` - Returns random items (simplified)
- `swipe_update(user_id, item_id, like=True)` - Tracks likes/dislikes

## Usage Example

```python
from item_functions import add_item
from user_functions import get_or_create_user
from recommender import random_feed, swipe_update

# Create user
user = get_or_create_user("user123")

# Add simple item
item_id = add_item(
    owner_id="user123",
    title="Old Book", 
    description="A book I don't need anymore",
    price=10.0
)

# Get random recommendations
recommendations = random_feed("user123", k=5)

# Track swipe
swipe_update("user123", item_id, like=True)
```

## What Was Removed (Simplified)

- ❌ Categories, conditions, locations
- ❌ Complex matching algorithms
- ❌ Image uploads
- ❌ Mutual likes/matches
- ❌ Status tracking
- ❌ Tags and embeddings
- ❌ Complex user profiles
- ❌ Advanced recommendation algorithms

## What Remains (Basic)

- ✅ Simple item creation (title, description, price)
- ✅ Basic user management
- ✅ Simple like/unlike functionality
- ✅ Random item recommendations
- ✅ Basic swipe tracking
- ✅ Clean, readable code

## Key Features

- **Beginner-friendly**: Simple functions that are easy to understand
- **No complex dependencies**: Works without advanced libraries
- **Clean API**: Consistent, simple function signatures
- **Easy to extend**: Basic foundation that can be built upon

## Database Schema (Simplified)

**Items:**
- `_id` - Unique identifier
- `owner_id` - User who posted the item
- `title` - Item title
- `description` - Item description
- `price` - Item price (optional)
- `created_at` - When item was created
- `likes` - Array of user IDs who liked it
- `likes_count` - Number of likes

**Users:**
- `_id` - Unique identifier
- `user_id` - User identifier
- `liked_item_ids` - Items the user liked
- `disliked_item_ids` - Items the user disliked
- `seen_item_ids` - Items the user has seen
