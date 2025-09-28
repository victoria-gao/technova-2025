# db.py
import os, certifi, pymongo
from dotenv import load_dotenv

load_dotenv()
MONGO_PASS = os.getenv("MONGO_PASS")
if not MONGO_PASS:
    raise ValueError("MONGO_PASS environment variable is not set.")

URI = f"mongodb+srv://sandy_db_user:{MONGO_PASS}@cluster0.htg8qve.mongodb.net/?retryWrites=true&appName=Cluster0"

client = pymongo.MongoClient(
    URI,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=30000,
)
db = client["UserData"]
users_col = db["flask_mongo"]
items_col = db["items"]
exchanges_col = db["exchanges"]
