from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, db
import os

app = Flask(__name__)
CORS(app)

# Firebase initialization
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com"
})

# Helper to verify Firebase ID token
def verify_user_token(req):
    id_token = req.headers.get("Authorization")
    if not id_token:
        raise Exception("Missing token.")
    decoded_token = auth.verify_id_token(id_token.replace("Bearer ", ""))
    return decoded_token["uid"]

@app.route("/api/get-user-info", methods=["GET"])
def get_user_info():
    try:
        uid = verify_user_token(request)
        ref = db.reference(f"users/{uid}")
        user_data = ref.get() or {}
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route("/api/update-profile", methods=["POST"])
def update_profile():
    try:
        uid = verify_user_token(request)
        data = request.form.to_dict()

        name = data.get("name", "")
        state = data.get("state", "")
        city = data.get("city", "")

        ref = db.reference(f"users/{uid}")
        ref.update({
            "name": name,
            "state": state,
            "city": city
        })

        return jsonify({"message": "Profile updated successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == "__main__":
    app.run(debug=True)
