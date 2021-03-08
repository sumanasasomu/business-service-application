from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/api/hola', methods=['GET', 'POST'])
def say_hola_world():
    if request.method == 'POST':
        formState = json.loads(request.data)
        return {'result': "1"}

# FLASK_APP=server.py flask run


