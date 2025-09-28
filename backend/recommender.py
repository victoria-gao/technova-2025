
import numpy as np, math, random
from user_functions import get_or_create_user, save_user
from item_functions import list_items_basic, get_item

def normalize(v):
    n = math.sqrt(sum(x*x for x in v))
    return [x/n for x in v] if n > 0 else v

def unique_extend(base, new_vals, limit=None):
    seen, out = set(base), list(base)
    for v in new_vals:
        if v not in seen:
            out.append(v); seen.add(v)
            if limit and len(out) >= limit: break
    return out

def random_feed(user_id, k=10):
    user = get_or_create_user(user_id)
    seen = set(user.get("seen_item_ids", []))
    pool = [it for it in list_items_basic() if it["_id"] not in seen and it["owner_id"] != user_id]
    random.shuffle(pool)
    batch = pool[:k]
    user["seen_item_ids"] = unique_extend(user.get("seen_item_ids", []), [it["_id"] for it in batch])
    save_user(user)
    return batch

def ranked_feed(user_id, k=10):
    """Simple ranked feed - just returns random items for now"""
    # Since we removed tags and embeddings, just return random feed
    return random_feed(user_id, k)

def swipe_update(user_id, item_id, like=True, alpha=0.2):
    """Simple swipe update - just track likes/dislikes"""
    user = get_or_create_user(user_id)
    
    if like:
        user["liked_item_ids"] = unique_extend(user.get("liked_item_ids", []), [item_id])
    else:
        user["disliked_item_ids"] = unique_extend(user.get("disliked_item_ids", []), [item_id])

    save_user(user)
