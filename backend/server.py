from flask import Flask, request, jsonify
from flask_cors import CORS
import ai_config
import openai
import json

app = Flask(__name__)
client = openai.OpenAI(api_key=open(".env").readline().strip())
CORS(app)

def generate_response(project_description, source_code_files, design_image_files):
    print("Hello, we're in the response generator function.")

    source_code = [file['content'] for file in source_code_files]

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

@app.route('/evaluate_project', methods=['POST'])
def evaluate_project():
    print("Hello, we're in the evaluate project function.")
    data = request.get_json()
    print("Received:", data)

    if data and 'project_description' in data and 'source_code_files' in data and 'design_image_files' in data:
        project_description = data['project_description']
        source_code_files = data['source_code_files']
        design_image_files = data['design_image_files']

        response_data = generate_response(project_description, source_code_files, design_image_files)
        print("Response data:\n")
        print(response_data)
        return jsonify(response_data), 200
    else:
        return jsonify({'error': 'Missing required fields (project_description, source_code_files, design_image_files)'}), 400

if __name__ == "__main__":
    app.run(host='localhost', port=9000, debug=True)