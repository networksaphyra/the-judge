from openai import OpenAI

file_path = (".env")
with open(file_path, 'r') as file:
    # Perform operations on the file
    for line in file:
        # key = (line.strip()) 


client = OpenAI(api_key=key)
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)