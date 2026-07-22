MY FINAL PROJECT

Budget Tracker — a Flask web app for tracking personal income and expenses. Users register, log in, and manage their own transactions.

What does it do? It's a personal budget tracker: each user registers an account, logs in, and manages their own list of transactions (income/expenses) with categories and dates.
What is the "new feature" which you have implemented that we haven't seen before? Live automatic calculation of balance, total income and total expense from the user's stored transactions, plus real-time search/filter of the transaction list (static/javascript/dashboard.js).
Prerequisites

Only Flask needs to be installed (everything else used is Python's standard library):

bash
pip install flask
Installation & Run Instructions
Clone the repository:
bash
   git clone 
   cd Budget_Tracker-master
Install Flask:
bash
   pip install flask
Make sure users.json and transactions.json exist in the project's root folder (they are created automatically on first run if missing).
Start the app:
bash
   python app.py
Open your browser at:
   http://127.0.0.1:5000/
Project Checklist
 It is available on GitHub. ✅
 It uses the Flask web framework. ✅
app.py:1 — from flask import Flask, render_template, request, jsonify
app.py:13 — app = Flask(__name__)
 It uses at least one module from the Python Standard Library other than the random module. ✅ Please provide the name of the module you are using in your app.
Module name: json and os — utils.py:1-2
 It contains at least one class written by you that has both properties and methods. It uses __init__() to let the class initialize the object's attributes (note that __init__() doesn't count as a method). This includes instantiating the class and using the methods in your app. ✅
File name for the class definition: models.py
Line number(s) for the class definition: lines 2-16 (User class, __init__ at lines 3-6). A second class, Transaction, is defined at lines 20-53.
Name of two properties: username, email
Name of two methods: to_dict() (line 8), check_password() (line 15)
File name and line numbers where the methods are used:
app.py:42 — User(...) instantiated
app.py:44 — to_dict() called
app.py:75-79 — User(...) instantiated (inside login loop)
app.py:81 — check_password() called
app.py:117 — Transaction(...) instantiated
app.py:127 — Transaction.to_dict() called
 It makes use of JavaScript in the front end and uses the localStorage of the web browser. ✅
static/javascript/login.js:72 — localStorage.setItem("username", data.username)
static/javascript/registe.js:95 — localStorage.setItem("username", username)
static/javascript/dashboard.js:55, 158, 336 — localStorage.getItem("username")
static/javascript/dashboard.js:444, 467, 477 — localStorage.getItem("theme") / localStorage.setItem("theme", ...)
 It uses modern JavaScript (for example, let and const rather than var). ✅
const/let used throughout login.js, registe.js, dashboard.js; var is never used.
 It makes use of the reading and writing to the same file feature. ✅
utils.py:7-21 — load_users() / save_users() read from and write to users.json
utils.py:28-42 — load_transactions() / save_transactions() read from and write to transactions.json
 It contains conditional statements. Please provide below the file name and the line number(s) of at least one example of a conditional statement in your code. ✅
File name: app.py
Line number(s): 27, 36, 65, 81, 110, 147, 200-203
 It contains loops. Please provide below the file name and the line number(s) of at least one example of a loop in your code. ✅
File name: app.py
Line number(s): 35, 73, 145, 198 (for loops); 163-177 (list comprehension loop)
 It lets the user enter a value in a text box at some point. This value is received and processed by your back end Python code. ✅
Username/password fields (login.html, register.html) and transaction title/amount/date fields (dashboard.html) are sent via fetch() to Flask routes in app.py: /api/login (line 57), /api/register (line 18), /api/add_transaction (line 96), /api/update_transaction/<id> (line 191), where they're read with request.get_json().
 It doesn't generate any error message even if the user enters a wrong input. ✅
Frontend validation in login.js and registe.js catches empty/invalid fields before submission; backend routes in app.py return JSON {"success": false, "message": ...} for invalid/duplicate data, shown to the user via alert().
 It is styled using your own CSS. ✅
static/CSS/style.css — custom styling for home/login/register pages, dashboard summary cards, buttons, and a full dark-mode theme.
 The code follows the code and style conventions as introduced in the course, is fully documented using comments and doesn't contain unused or experimental code. In particular, the code should not use print() or console.log() for any information the app user should see. Instead, all user feedback needs to be visible in the browser. ✅
No print() or console.log() calls found anywhere in app.py, models.py, utils.py, or the JavaScript files. All feedback is shown via on-page validation messages or alert().
 All exercises have been completed as per the requirements and pushed to the respective GitHub repository. ✅