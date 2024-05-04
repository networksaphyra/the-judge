from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)

actual_key = os.getenv('key')

@app.route('/process', methods=['POST']) 
def process():
    data = request.get_json() # retrieve the data sent from JavaScript 
    # process the data using Python code 
    description = str(data)
    
    return jsonify('clear') 


openkey = open()