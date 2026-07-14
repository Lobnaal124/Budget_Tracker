from flask import Flask, render_template, request, jsonify
import json
import os


app = Flask(__name__)

FILE = "users.json"


@app.route("/api/register", methods=["POST"])
def api_register():

    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    if not os.path.exists(FILE):
        with open(FILE, "w") as f:
            json.dump([], f)

    with open(FILE, "r") as f:
        users = json.load(f)

    users.append({

        "username": username,
        "email": email,
        "password": password
    })

    with open(FILE, "w") as f:
        json.dump(users, f, indent=4)

    return jsonify({"success": True})

@app.route("/api/login", methods=["POST"])
def api_login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    with open(FILE, "r") as f:
        users = json.load(f)

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({
                "success": True,
                "username": user["username"]
            })

    return jsonify({
        "success": False,
        "message": "Invalid email or password"
    })



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

if __name__ == "__main__":
    app.run(debug=True)