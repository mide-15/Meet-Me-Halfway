from http.server import BaseHTTPRequestHandler
import json
import os
import firebase_admin
from firebase_admin import credentials, db, auth
from firebase_admin.exceptions import FirebaseError
import re

# Initialize Firebase only once
if not firebase_admin._apps:
    try:
        #cred_dict = json.loads(os.environ.get('API_KEY'))
        #cred = credentials.Certificate(cred_dict)
        cred = credentials.Certificate("firebase-adminsdk.json")
        firebase_admin.initialize_app(cred, {
            "databaseURL": "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com/"
        })
    except Exception as e:
        print(f"Firebase initialization error: {str(e)}")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_type = self.headers.get('Content-Type', '')
        if 'multipart/form-data' in content_type:
            boundary = content_type.split('=')[1].strip()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')

            # Parse form data
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

            if self.path == "/api/register":
                self.handle_register(form_data)
            elif self.path == "/api/update-profile":
                self.handle_update_profile(form_data)
            else:
                self.respond_not_found()
        else:
            self.respond_unsupported()

    def handle_register(self, form_data):
        try:
            email = form_data.get('email', '')
            password = form_data.get('password', '')
            dname = form_data.get('dname', '')

            user = auth.create_user(email=email, password=password, display_name=dname)

            ref = db.reference("/Users")
            ref.child(user.uid).set({
                "name": dname,
                "email": email
            })

            self.respond_json(200, {'status': 'success'})

        except ValueError as e:
            self.respond_json(400, {'status': 'value_error', 'message': str(e)})
        except FirebaseError as e:
            self.respond_json(400, {'status': 'firebase_error', 'message': str(e)})
        except Exception as e:
            self.respond_json(500, {'status': 'error', 'message': f"Server error: {str(e)}"})

    def handle_update_profile(self, form_data):
        try:
            auth_header = self.headers.get("Authorization")
            if not auth_header:
                raise Exception("Missing token.")

            decoded_token = auth.verify_id_token(auth_header.replace("Bearer ", ""))
            uid = decoded_token["uid"]

            ref = db.reference(f"users/{uid}")
            ref.update({
                "name": form_data.get("name", ""),
                "state": form_data.get("state", ""),
                "city": form_data.get("city", "")
            })

            self.respond_json(200, {"message": "Profile updated successfully."})

        except Exception as e:
            self.respond_json(401, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/register":
            self.respond_json(200, {
                'status': 'alive',
                'message': 'Registration endpoint is working. Use POST to register.'
            })
        elif self.path == "/api/update-profile":
            self.respond_json(200, {
                'status': 'alive',
                'message': 'Update profile endpoint is working. Use POST to update.'
            })
        else:
            self.respond_not_found()

    # Utility functions
    def respond_json(self, code, payload):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def respond_not_found(self):
        self.respond_json(404, {'status': 'error', 'message': 'Endpoint not found'})

    def respond_unsupported(self):
        self.respond_json(415, {'status': 'error', 'message': 'Unsupported content type'})
