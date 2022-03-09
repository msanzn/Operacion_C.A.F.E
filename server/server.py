from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SocketServer
import json
import cgi



class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With") 
        self.end_headers()
        
    def do_HEAD(self):
        print("head")
        self._set_headers()
        
    # GET sends back a Hello world message
    def do_GET(self):
        print("get")
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        # not sure about this part below
        with open('./cafes.json') as f:
            cafe_num = json.load(f)
        self.wfile.write(json.dumps(cafe_num))
        return {"fdassdfasdfdasfas"}
        
    # POST echoes the message adding a JSON field
    def do_POST(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        # not sure about this part below
        with open('./cafes.json') as f:
            cafe_num = json.load(f)
        cafe_num=cafe_num-1;
        f = open("./cafes.json", "w")
        f.write(str(cafe_num))
        self.wfile.write(json.dumps(cafe_num))
        return {"fdassdfasdfdasfas"}

    def do_OPTIONS(self):
        print('options')
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        
def run(server_class=HTTPServer, handler_class=Server, port=8008):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    
    print('Starting httpd on port %d...' % port)
    httpd.serve_forever()
    
if __name__ == "__main__":
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
        
