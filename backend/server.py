from flask import Flask, request, jsonify
from flask_cors import CORS
import ai_config
import openai
import json

app = Flask(__name__)
client = openai.OpenAI(api_key=open(".env").readline().strip())
CORS(app)

def generate_response_rating_description(query):
    messages = [
        {"role": "system", "content": ai_config.MODEL_INFORMATION_RATING_DESCIRPTION["CONTEXT"]},
        {"role": "user", "content": query}
    ]
    response = client.chat.completions.create(
        model=ai_config.MODEL_INFORMATION_RATING_DESCIRPTION["MODEL"],
        messages=messages,
    )
    return json.loads(response.choices[0].message.content)


@app.route('/', methods=['POST'])
def get_members():
    data = request.get_json()
    print("Received:", data)

    if data and 'query' in data:
        query = data['query']
        response_data_rating = generate_response_rating_description(query)
        print("This is the reponse data\n")
        print(response_data_rating)

        return jsonify(response_data_rating)
    else:
        return jsonify({'error': 'Invalid request'})

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)

