from http.server import BaseHTTPRequestHandler
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
        # Check if the path is our registration endpoint
        if self.path == "/api/register":
            content_type = self.headers.get('Content-Type', '')

            if 'multipart/form-data' in content_type:
                # Get the boundary
                boundary = content_type.split('=')[1].strip()
                
                # Read the content
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length).decode('utf-8')
                
                # Parse multipart form data
                form_data = {}
                parts = post_data.split('--' + boundary)
                
                for part in parts:
                    # Skip empty parts and the final boundary
                    if not part or part.strip() == '--':
                        continue
                    
                    # Extract field name and value
                    match = re.search(r'name=\"([^\"]+)\"\r\n\r\n(.*?)(?:\r\n--|\Z)', part, re.DOTALL)
                    if match:
                        field_name = match.group(1)
                        field_value = match.group(2).strip()
                        form_data[field_name] = field_value
                
                # Extract form values
                email = form_data.get('email', '')
                password = form_data.get('password', '')
                dname = form_data.get('dname', '')

                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'dname',
                    'message': dname
                }).encode())

            try:
                # Create the user in Firebase Auth
                user = auth.create_user(email=email, password=password, display_name=dname)
                
                # Add user to the database
                ref = db.reference("/Users")
                ref.child(user.uid).set({
                    "name": dname,
                    "email": email
                })
                
                # Return success response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'success'
                }).encode())
                
            except ValueError as e:
                # Handle validation errors
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'value_error',
                    'message': str(e)
                }).encode())
                
            except FirebaseError as e:
                # Handle Firebase-specific errors
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'firebase_error',
                    'message': str(e)
                }).encode())
                
            except Exception as e:
                # Handle any other unexpected errors
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'error',
                    'message': f"Server error: {str(e)}"
                }).encode())
        else:
            # Handle unknown endpoints
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Endpoint not found'
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
        if self.path == "/api/register":
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'alive',
                'message': 'Registration endpoint is working. Use POST to register.'
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