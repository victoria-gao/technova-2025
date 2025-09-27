import pymongo 
import os

from dotenv import load_dotenv

load_dotenv()

MONGO_PASS = os.environ.get("MONGO_PASS")

if not MONGO_PASS:
    raise ValueError("MONGOPASS environment variable is not set.")

#Xenas uri
uri = f"mongodb+srv://xenap26_db_user:{MONGO_PASS}@cluster0.htg8qve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

cluster = pymongo.MongoClient(uri)
db = cluster["UserData"]
collection = db["flask_mongo"]