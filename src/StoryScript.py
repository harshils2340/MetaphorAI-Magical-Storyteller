import openai
from metaphor_python import Metaphor
import json
import argparse

# Set your API keys here
openai.api_key = "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"
metaphor = Metaphor("3787a3cd-2e26-48d7-ae2a-3eff73d5f855")

parser = argparse.ArgumentParser(description='Process user input.')
parser.add_argument('--userInput', type=str, help='User input from Node.js')

# Parse the command-line arguments
args = parser.parse_args()

# Access the value of 'userInput'
user_query = args.userInput

SYSTEM_MESSAGE = "You are a helpful assistant that generates search queries based on user questions. Only generate one search query."

completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": SYSTEM_MESSAGE},
        {"role": "user", "content": user_query},
    ],
)

query = completion.choices[0].message.content

# Step 2: Use Metaphor API to search for books related to the query
search_response = metaphor.search(
    query, use_autoprompt=True, start_published_date="2023-06-01"
)

# Get the URLs of the top 2 books
book_urls = [result.url for result in search_response.results[:2]]

# Step 3: Summarize the content of the top 3 books and concatenate the summaries
book_summaries = []

SYSTEM_MESSAGE = "You are a helpful assistant that summarizes the content of a webpage. Summarize the users' input."

for book_url in book_urls:
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": SYSTEM_MESSAGE},
            {"role": "user", "content": book_url},
        ],
    )

    summary = completion.choices[0].message.content
    book_summaries.append(summary)

# Step 4: Concatenate the book summaries to create a single text
concatenated_text = "\n\n".join(book_summaries)

# Step 5: Use GPT-3.5-turbo to generate a new story based on the concatenated text
SYSTEM_MESSAGE = "You are a creative storyteller assistant. Please create a unique and creative story for a 5 year old kid based on the book summaries. Make it short and sweet."

completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": SYSTEM_MESSAGE},
        {"role": "user", "content": concatenated_text},
    ],
)

story = completion.choices[0].message.content

paragraphs = story.split('\n')

textWithImg = {}

paragraphs = [paragraph for paragraph in paragraphs if paragraph.strip()]

textWithImg = []

for i in range(1):
    try:
        response = openai.Image.create(
        prompt = paragraphs[i],
        n=1,
        size = "1024x1024"
    )  
        image_url = response['data'][0]['url']

        textWithImg.append({
            "text": paragraphs[i].strip(),
            "url": image_url
        })

    except openai.error.OpenAIError as e:
        print(e.http_status)
        print(e.error)

textWithImg_json = json.dumps(textWithImg)

print(textWithImg_json)
