from http.server import BaseHTTPRequestHandler
import json
import os
import firebase_admin
from firebase_admin import credentials, db, auth
from firebase_admin.exceptions import FirebaseError
import re
import base64

# Initialize Firebase only once
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
    def _set_headers(self, code=200):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/register":
            self._set_headers()
            self.wfile.write(json.dumps({
                'status': 'alive',
                'message': 'Registration endpoint is working. Use POST to register.'
            }).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Endpoint not found'
            }).encode())

    def do_POST(self):
        if self.path == "/api/register":
            self._handle_register()
        elif self.path == "/api/update-profile":
            self._handle_update_profile()
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Endpoint not found'
            }).encode())

    def _handle_register(self):
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

            email = form_data.get('email', '')
            password = form_data.get('password', '')
            dname = form_data.get('dname', '')

            try:
                user = auth.create_user(email=email, password=password, display_name=dname)
                ref = db.reference("/Users")
                ref.child(user.uid).set({
                    "name": dname,
                    "email": email
                })

                self._set_headers(200)
                self.wfile.write(json.dumps({'status': 'success'}).encode())

            except (ValueError, FirebaseError) as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode())

            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({'status': 'error', 'message': f"Server error: {str(e)}"}).encode())

    def _handle_update_profile(self):
        # Check authorization header
        auth_header = self.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            self._set_headers(401)
            self.wfile.write(json.dumps({'status': 'error', 'message': 'Missing or invalid token'}).encode())
            return

        token = auth_header.split(' ')[1]

        try:
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']

            content_type = self.headers.get('Content-Type', '')
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length).decode('utf-8')

            form_data = {}
            if 'application/x-www-form-urlencoded' in content_type:
                for pair in body.split('&'):
                    key, value = pair.split('=')
                    form_data[key] = value.replace('+', ' ')
            elif 'multipart/form-data' in content_type:
                boundary = content_type.split('=')[1].strip()
                parts = body.split('--' + boundary)
                for part in parts:
                    match = re.search(r'name=\"([^\"]+)\"\r\n\r\n(.*?)(?:\r\n--|\Z)', part, re.DOTALL)
                    if match:
                        form_data[match.group(1)] = match.group(2).strip()

            name = form_data.get('name')
            state = form_data.get('state')
            city = form_data.get('city')

            # Update Firebase Auth display name
            if name:
                auth.update_user(uid, display_name=name)

            # Build only non-empty updates
            updates = {}
            if name:
                updates["name"] = name
            if state:
                updates["state"] = state
            if city:
                updates["city"] = city

            # Only call update if there’s something to update
            if updates:
                ref = db.reference(f"/Users/{uid}")
                ref.update(updates)

            self._set_headers(200)
            self.wfile.write(json.dumps({'status': 'success', 'message': 'Profile updated'}).encode())

        except FirebaseError as e:
            self._set_headers(400)
            self.wfile.write(json.dumps({'status': 'firebase_error', 'message': str(e)}).encode())

        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({'status': 'error', 'message': f"Server error: {str(e)}"}).encode())
