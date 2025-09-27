import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# Prompt generation for tagging
TAG_PROMPT = (
    "You are helping organize sustainable, second-hand marketplace listings called GreenSwipe. "
    "Given title and description, return ONLY a comma-separated list of 3 to 6 short tags. "
    "Use lowercase single words where possible; no hashtags; no brand guessing."
)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents=[TAG_PROMPT,"Explain what GreenSwipe is in a few sentences."]
)
print(response.text)