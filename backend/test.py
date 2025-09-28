import certifi
from pymongo import MongoClient

# Replace with your Atlas URI
MONGO_URI = "mongodb+srv://victoriagaojing_db_user:lumina@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(MONGO_URI, tls=True, tlsCAFile=certifi.where())
    # Run a simple command
    print("MongoDB server info:", client.server_info())
    print("✅ Connected to MongoDB!")
except Exception as e:
    print("❌ Connection failed:", e)
