import json
import os

FILE = "users.json"

# user method 
def load_users():
    if not os.path.exists(FILE):
        with open(FILE, "w") as f:
            json.dump([], f)

    try:
        with open(FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def save_users(users):
    with open(FILE, "w") as f:
        json.dump(users, f, indent=4)



# transaction method 
TRANSACTION_FILE = "transactions.json"

def load_transactions():

    if not os.path.exists(TRANSACTION_FILE):

        with open(TRANSACTION_FILE, "w") as f:
            json.dump([], f)

    with open(TRANSACTION_FILE, "r") as f:
        return json.load(f)


def save_transactions(transactions):

    with open(TRANSACTION_FILE, "w") as f:
        json.dump(transactions, f, indent=4)