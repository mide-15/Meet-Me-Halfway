# set and change primary address
# set change phone number
# change username and password
# edit and view information primarily

import time
import firebase_admin
# import api.py 
from firebase_admin import credentials, db, auth
from flask import Flask, request, jsonify, make_response

# Connect to the database
cred = credentials.Certificate("meet-me-halfway-5475f-firebase-adminsdk-cg006-4403413b2a.json")
firebase_admin.initialize_app(cred, {"databaseURL" : "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com/"})

app = Flask(__name__)

# have phone number and address added to register function later
# alongside username, password

# uid (unique user identifier which you can get when the user logs in or from Firebase Authentication)
def update_passord(uid, new_password):
    try:
        user = auth.update_user(uid, password=new_password)
        print(f'Successfully updated password for user: {user.uid}')
    except auth.AuthError as e:
        print(f'Error updating password: {e}')
    
    
def update_name(uid, name=new_name):
    try:
        # get the Firestore reference to the user's settings document
        user_ref = db.collection('users').document(uid)
        
        # update the username field in the user's document
        user_ref.update({
            'username': new_name
        })
        
        user = auth.update_user(uid, name=new_name)
        print(f'Successfully updated name for user: {user.uid}')
    except auth.AuthError as e:
        print(f'Error updating name: {e}')
        
        
     res = make_response(jsonify({"status": "success"}, 200))
    return res

def update_address(uid, name=new_email):
    try:
        # get the Firestore reference to the user's settings document
        user_ref = db.collection('users').document(uid)
        
        # update the email address field in the user's document
        user_ref.update({
            'email address': new_email
        })
        
        user = auth.update_user(uid, email=new_name)
        print(f'Successfully updated email address for user: {user.uid}')
    except auth.AuthError as e:
        print(f'Error updating email address: {e}')
        
        
     res = make_response(jsonify({"status": "success"}, 200))
    return res
