
from bson import ObjectId
from db import users_col, items_col
from gemini import generate_tags, embed_text  

def find_user_by_username(username):
    return users_col.find_one({"username": username}, {"_id": 1, "username": 1})

def add_item_for_user(username, title, description):
    user = find_user_by_username(username)
    if not user:
        raise ValueError(f"no user found for username={username}")

    tags = generate_tags(title, description)    # ["leather","jacket","vintage",...]
    emb  = embed_text(tags)                     # normalized list[float]

    doc = {
        "owner_id": user["_id"],               # store as ObjectId 
        "title": title,
        "description": description,
        "tags": tags,
        "embedding": emb,                      # list of floats from gemini.py
    }
    res = items_col.insert_one(doc)
    return str(res.inserted_id)

if __name__ == "__main__":
    new_id = add_item_for_user(
        username="kim",
        title="Vintage Leather Jacket",
        description="Stylish vintage leather jacket; great for fall/winter."
    )
    print("Inserted item:", new_id)
