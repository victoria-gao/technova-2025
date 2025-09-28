# ping_mongo.py (anywhere inside your venv)
from db import client
print(client.server_info()["version"])  # forces TLS handshake
