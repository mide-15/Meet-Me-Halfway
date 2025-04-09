import time
import firebase_admin
from firebase_admin import credentials, db, auth
from flask import Flask, request, jsonify, make_response

# Connect to Firebase Database
cred = credentials.Certificate("meet-me-halfway-5475f-firebase-adminsdk-cg006-4403413b2a.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com/"})

app = Flask(__name__)

# Confirm password and update user password
def update_password(uid, new_password, confirm_password):
    if new_password != confirm_password:
        return make_response(jsonify({"error": "Passwords do not match"}), 400)

    try:
        auth.update_user(uid, password=new_password)
        print(f"Successfully updated password for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except auth.AuthError as e:
        print(f"Error updating password: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update user name
def update_name(uid, new_name):
    try:
        user_ref = db.reference(f'users/{uid}')
        user_ref.update({"username": new_name})

        auth.update_user(uid, display_name=new_name)
        print(f"Successfully updated name for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except auth.AuthError as e:
        print(f"Error updating name: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update user email
def update_email(uid, new_email):
    try:
        user_ref = db.reference(f'users/{uid}')
        user_ref.update({"email": new_email})

        auth.update_user(uid, email=new_email)
        print(f"Successfully updated email address for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except auth.AuthError as e:
        print(f"Error updating email address: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update user address
def update_address(uid, new_address):
    try:
        user_ref = db.reference(f'users/{uid}')
        user_ref.update({"address": new_address})
        print(f"Successfully updated address for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except Exception as e:
        print(f"Error updating address: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update user state
def update_state(uid, new_state):
    try:
        user_ref = db.reference(f'users/{uid}')
        user_ref.update({"state": new_state})
        print(f"Successfully updated state for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except Exception as e:
        print(f"Error updating state: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update user city
def update_city(uid, new_city):
    try:
        user_ref = db.reference(f'users/{uid}')
        user_ref.update({"city": new_city})
        print(f"Successfully updated city for user: {uid}")
        return make_response(jsonify({"status": "success"}), 200)
    except Exception as e:
        print(f"Error updating city: {e}")
        return make_response(jsonify({"error": str(e)}), 400)

# Update multiple user fields in one API call
@app.route('/update_user', methods=['POST'])
def update_user():
    data = request.get_json()

    uid = data.get('uid')
    new_name = data.get('name')
    new_email = data.get('email')
    new_password = data.get('password')
    confirm_password = data.get('confirm_password')
    new_address = data.get('address')
    new_state = data.get('state')
    new_city = data.get('city')

    # Update name if provided
    if new_name:
        name_response = update_name(uid, new_name)
        if name_response.status_code != 200:
            return name_response

    # Update email if provided
    if new_email:
        email_response = update_email(uid, new_email)
        if email_response.status_code != 200:
            return email_response

    # Update password if provided and confirmed
    if new_password:
        password_response = update_password(uid, new_password, confirm_password)
        if password_response.status_code != 200:
            return password_response

    # Update address if provided
    if new_address:
        address_response = update_address(uid, new_address)
        if address_response.status_code != 200:
            return address_response

    # Update state if provided
    if new_state:
        state_response = update_state(uid, new_state)
        if state_response.status_code != 200:
            return state_response

    # Update city if provided
    if new_city:
        city_response = update_city(uid, new_city)
        if city_response.status_code != 200:
            return city_response

    return make_response(jsonify({"status": "success"}), 200)

if __name__ == "__main__":
    app.run(debug=True)
