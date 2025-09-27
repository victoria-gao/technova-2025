# Placeholder for now — you can add a real database model later.
# Keeps your import from breaking.
class User:
    def __init__(self, username):
        self.username = username

    def __repr__(self):
        return f"<User {self.username}>"
