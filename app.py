from flask import Flask, render_template, request, jsonify

from models import User, Transaction

from utils import (
    load_users,
    save_users,
    load_transactions,
    save_transactions
)


app = Flask(__name__)

# ===========================
# Register API
# ===========================
@app.route("/api/register", methods=["POST"])
def api_register():

    data = request.get_json()

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not username or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    users = load_users()

# Check username
    for user in users:
     if user["username"].lower() == username.lower():
       return jsonify({
            "success": False,
            "message": "Username already exists."
        }), 400

# Check email
    for user in users:
     if user["email"].lower() == email.lower():
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 400

    new_user = User(username, email, password)

    users.append(new_user.to_dict())

    save_users(users)

    return jsonify({
        "success": True,
        "message": "Registration successful."
    })


# ===========================
# Login API
# ===========================
@app.route("/api/login", methods=["POST"])
def api_login():

    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Please enter username and password."
        }), 400

    users = load_users()

    for user_data in users:

        user = User(
            user_data["username"],
            user_data["email"],
            user_data["password"]
        )

        if user.username == username and user.check_password(password):
            return jsonify({
                "success": True,
                "username": user.username
            })

    return jsonify({
        "success": False,
        "message": "Invalid username or password."
    })

# ===========================
# Add Transaction API
# ===========================

@app.route("/api/add_transaction", methods=["POST"])
def add_transaction():

    data = request.get_json()

    title =data["title"]
    amount = data["amount"]
    category = data["category"]
    transaction_type = data["type"]
    date = data["date"]

    transactions = load_transactions()

    # Generate ID
    if len(transactions) == 0:
        new_id = 1
    else:
        new_id = transactions[-1]["id"] + 1
    #  for each user
    username = data["username"]

    new_transaction = Transaction(
    new_id,
    username,
    title,
    amount,
    category,
    transaction_type,
    date

     )
    transactions.append(new_transaction.to_dict())

    save_transactions(transactions)

    return jsonify({
        "success": True,
        "message": "Transaction Added Successfully."
    })

@app.route("/api/transactions")
def get_transactions():

    username = request.args.get("username")

    transactions = load_transactions()

    user_transactions = []

    for transaction in transactions:

        if transaction["username"] == username:

            user_transactions.append(transaction)

    return jsonify(user_transactions)

# ===========================
# Delete Transaction API
# ===========================
@app.route("/api/delete_transaction/<int:id>", methods=["DELETE"])
def delete_transaction(id):

    transactions = load_transactions()

    username = request.args.get("username")

    transactions = [

    transaction

    for transaction in transactions

    if not (

        transaction["id"] == id and

        transaction["username"] == username

    )

    ]

    save_transactions(transactions)

    return jsonify({

        "success": True,
        "message": "Transaction deleted successfully."

    })

# ===========================
# Update Transaction API
# ===========================
@app.route("/api/update_transaction/<int:id>", methods=["PUT"])
def update_transaction(id):

    data = request.get_json()

    transactions = load_transactions()

    for transaction in transactions:

        if (
            transaction["id"] == id
            and transaction["username"] == data["username"]
        ):
            transaction["title"] =data["title"]
            transaction["amount"] = float(data["amount"])
            transaction["category"] = data["category"]
            transaction["transaction_type"] = data["type"]
            transaction["date"] = data["date"]

            save_transactions(transactions)

            return jsonify({
                "success": True,
                "message": "Transaction updated successfully."
            })

    return jsonify({
        "success": False,
        "message": "Transaction not found."
    })

# ===========================
# Pages
# ===========================
@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")
# ===========================
# Run app
# ===========================

if __name__ == "__main__":
    app.run(debug=True)