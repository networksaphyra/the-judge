from flask import Flask, request, jsonify
from flask_cors import CORS
import ai_config
import openai
import json

app = Flask(__name__)
client = openai.OpenAI(api_key=open(".env").readline().strip())

CORS(app)

def generate_response(project_description: str, source_code: list[str]):
    messages = [
        {"role": "system", "content": ai_config.MODEL_INFORMATION["CONTEXT"]},
        {"role": "user", "content": f"Project Description: {project_description}\n\nSource Code:\n{''.join(source_code)}"}
    ]

    response = client.chat.completions.create(
        model=ai_config.MODEL_INFORMATION["MODEL"],
        messages=messages,
        temperature=ai_config.MODEL_INFORMATION["TEMPERATURE"],
        max_tokens=ai_config.MODEL_INFORMATION["MAX_TOKENS"],
    )

    response_dict = response.choices[0].message.to_dict()
    print(f"Response content: {response_dict}")
    return response_dict

@app.route('/', methods=['POST'])
def evaluate_project():
    data = request.get_json()
    print("Received:", data)

    if data and 'project_description' in data and 'source_code' in data and 'design' in data:
        project_description = data['project_description']
        source_code = data['source_code']
        design = data['design']

        response_data = generate_response(project_description, source_code)
        print("Response data:\n")
        print(response_data)

        return jsonify(response_data)
    else:
        return jsonify({'error': 'Missing required fields (project_description, source_code, design)'})
    
@app.route('/', methods=['POST'])
def read():
    

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)