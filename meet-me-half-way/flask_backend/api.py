import time
import firebase_admin
from firebase_admin import credentials, db, auth
from flask import Flask, request

# Connect to the database
cred = credentials.Certificate("meet-me-halfway-5475f-firebase-adminsdk-cg006-4403413b2a.json")
firebase_admin.initialize_app(cred, {"databaseURL" : "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com/"})

app = Flask(__name__)


@app.route("/time")
def get_current_time():
    return {"time": time.time()}

# Register a new user and add them to the database
@app.route("/register", methods = ["POST", "GET"])
def register():
    email = request.form["email"]
    password = request.form["password"]
    name = request.form["name"]

    try:
        user = auth.create_user(email=email, password=password, display_name=name)
    except Exception as e:
        return {"status": "error", "message": str(e)}

    ref = db.reference("/Users")

    ref.child(user.uid).set({
        "name": name,
        "email": email
    })

    return {"status": "success"}