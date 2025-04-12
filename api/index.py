from http.server import BaseHTTPRequestHandler
import json

def handler(request):
    # Simple dictionary to return as JSON
    data = {"message": "Hello from Python API!"}
    
    # Return response with headers
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(data)
    }