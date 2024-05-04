from openai import OpenAI

file_path = (".env")
with open(file_path, 'r') as file:
    # Perform operations on the file
    for line in file:
         key = (line.strip()) 

from ai_config import MODEL_INFORMATION_FEEDBACK_DESCIRPTION

client = OpenAI(api_key=key)
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": MODEL_INFORMATION_FEEDBACK_DESCIRPTION["CONTEXT"] },
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)
