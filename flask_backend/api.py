import time
import firebase_admin
from firebase_admin import credentials, db, auth
from firebase_admin.exceptions import FirebaseError
from flask import Flask, request, jsonify, make_response

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
    dname = request.form["dname"]
    
    try:
        user = auth.create_user(email=email, password=password, display_name=dname)
    except ValueError as e:
        res = make_response(jsonify({'status': 'error', 'message': str(e)}, 400))
        return res, 400
    except FirebaseError as e:
        res = make_response(jsonify({'status': 'error', 'message': str(e)}, 400))
        return res, 400

    ref = db.reference("/Users")

    ref.child(user.uid).set({
        "name": dname,
        "email": email
    })

    res = make_response(jsonify({'status': 'success'}, 200))
    return res