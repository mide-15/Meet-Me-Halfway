from http.server import BaseHTTPRequestHandler
import json
import os
import firebase_admin
from firebase_admin import credentials, db, auth
from firebase_admin.exceptions import FirebaseError
from urllib.parse import parse_qs

# Initialize Firebase only once when the serverless function is loaded
# This prevents re-initialization on every request
if not firebase_admin._apps:
    try:
        #cred_path = "meet-me-halfway-5475f-firebase-adminsdk-cg006-4403413b2a.json"
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
            # Get content length to read the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            # Parse form data
            form_data = parse_qs(post_data)
            
            # Extract form fields (taking first value if multiple are provided)
            email = form_data.get('email', [''])[0]
            password = form_data.get('password', [''])[0]
            dname = form_data.get('dname', [''])[0]
            
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
                    'status': 'error',
                    'message': str(e)
                }).encode())
                
            except FirebaseError as e:
                # Handle Firebase-specific errors
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'status': 'error',
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