"""from http.server import BaseHTTPRequestHandler
import json
import os
import firebase_admin
from firebase_admin import credentials, db, auth
from firebase_admin.exceptions import FirebaseError
import re

# Initialize Firebase only once when the serverless function is loaded
# This prevents re-initialization on every request
if not firebase_admin._apps:
    try:
        cred_dict = json.loads(os.environ.get('API_KEY'))
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred, {
            "databaseURL": "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com/"
        })
    except Exception as e:
        print(f"Firebase initialization error: {str(e)}")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Handle the /api/register endpoint
        if self.path == "/api/register":
            self.handle_register()
        
        # Handle the /api/update-profile endpoint
        elif self.path == "/api/update-profile":
            self.handle_update_profile()
        
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Endpoint not found'
            }).encode())

    def handle_register(self):
        content_type = self.headers.get('Content-Type', '')
        if 'multipart/form-data' in content_type:
            boundary = content_type.split('=')[1].strip()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')

            form_data = {}
            parts = post_data.split('--' + boundary)
            for part in parts:
                if not part or part.strip() == '--':
                    continue
                match = re.search(r'name=\"([^\"]+)\"\r\n\r\n(.*?)(?:\r\n--|\Z)', part, re.DOTALL)
                if match:
                    field_name = match.group(1)
                    field_value = match.group(2).strip()
                    form_data[field_name] = field_value

            try:
                email = form_data.get('email', '')
                password = form_data.get('password', '')
                dname = form_data.get('dname', '')

                # Create the user in Firebase Auth
                user = auth.create_user(email=email, password=password, display_name=dname)

                # Add user to the Firebase Realtime Database
                ref = db.reference("/Users")
                ref.child(user.uid).set({
                    "name": dname,
                    "email": email
                })

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'success'
                }).encode())

            except ValueError as e:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'value_error',
                    'message': str(e)
                }).encode())

            except FirebaseError as e:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'firebase_error',
                    'message': str(e)
                }).encode())

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'error',
                    'message': f"Server error: {str(e)}"
                }).encode())

    def handle_update_profile(self):
        content_type = self.headers.get('Content-Type', '')
        if 'multipart/form-data' in content_type:
            boundary = content_type.split('=')[1].strip()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')

            form_data = {}
            parts = post_data.split('--' + boundary)
            for part in parts:
                if not part or part.strip() == '--':
                    continue
                match = re.search(r'name=\"([^\"]+)\"\r\n\r\n(.*?)(?:\r\n--|\Z)', part, re.DOTALL)
                if match:
                    field_name = match.group(1)
                    field_value = match.group(2).strip()
                    form_data[field_name] = field_value

            try:
                auth_header = self.headers.get("Authorization")
                if not auth_header:
                    raise Exception("Missing token.")
                decoded_token = auth.verify_id_token(auth_header.replace("Bearer ", ""))
                uid = decoded_token["uid"]

                # Update Firebase Realtime Database
                ref = db.reference(f"users/{uid}")
                ref.update({
                    "name": form_data.get("name", ""),
                    "state": form_data.get("state", ""),
                    "city": form_data.get("city", "")
                })

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "message": "Profile updated successfully."
                }).encode())

            except Exception as e:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": str(e)
                }).encode())

    def do_OPTIONS(self):
        # Handle preflight CORS requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        # For testing the endpoint is live
        if self.path == "/api/update-profile":
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'alive',
                'message': 'Update profile endpoint is working. Use POST to update.'
            }).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Endpoint not found'
            }).encode())
