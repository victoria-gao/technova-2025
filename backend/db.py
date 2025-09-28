import pymongo 
import os

from dotenv import load_dotenv
from flask_pymongo import PyMongo

mongo = PyMongo()




#items_col = mongo.db.items

load_dotenv()

MONGO_PASS = os.environ.get("MONGO_PASS")

if not MONGO_PASS:
    raise ValueError("MONGOPASS environment variable is not set.")

#Xenas uri
uri = f"mongodb+srv://xenap26_db_user:{MONGO_PASS}@cluster0.htg8qve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

cluster = pymongo.MongoClient(uri)
db = cluster["UserData"]

users_col = db["flask_mongo"]
items_col = db["items"]