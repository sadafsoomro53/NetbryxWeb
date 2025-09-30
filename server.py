#!/usr/bin/env python3
"""
NetBryx Website Server
Automatically serves index.html as the default homepage
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class NetBryxHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # If root path is requested, serve index.html
        if path == '/' or path == '':
            self.path = '/index.html'
        
        # Call the parent method to handle the request
        return super().do_GET()
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server(port=8000):
    """Start the NetBryx website server"""
    
    # Change to the directory containing the website files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Create the server
    with socketserver.TCPServer(("", port), NetBryxHTTPRequestHandler) as httpd:
        print(f"🚀 NetBryx Website Server Started!")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🌐 Website URL: http://localhost:{port}/")
        print(f"🏠 Homepage: http://localhost:{port}/ (automatically redirects to index.html)")
        print(f"🔧 Debug page: http://localhost:{port}/debug.html")
        print(f"📋 Test page: http://localhost:{port}/test.html")
        print(f"\n⏹️  Press Ctrl+C to stop the server")
        print("-" * 60)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped!")
            sys.exit(0)

if __name__ == "__main__":
    # Check if port is provided as command line argument
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number. Using default port 8000.")
    
    start_server(port)
