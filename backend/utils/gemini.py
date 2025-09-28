import os
from google import genai
from dotenv import load_dotenv
import math

load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# Prompt generation for tagging
TAG_PROMPT = (
    "You are helping organize sustainable, second-hand marketplace listings called GreenSwipe. "
    "Given title and description, return ONLY a comma-separated list of 3 to 5 short tags. Add 2 more unrelated tags to diversify when matching. "
    "Use lowercase single words where possible; no hashtags; no brand guessing."
)

title = "Vintage Leather Jacket"
description = "A stylish vintage leather jacket in great condition. Perfect for fall and winter wear." #FOR TESTING PURPOSES, REMOVE LATER

def generate_tags(title, description):
    prompt = f"{TAG_PROMPT}\n\nTitle: {title}\nDescription: {description}\n"
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=[prompt]
    )
    tags = response.text.strip()
    return [tag.strip() for tag in tags.split(",") if tag.strip()] #force lowrcase for consistency
print(generate_tags(title, description))
def embed_text(tags):
    """
    Takes a list of tags, joins them into a string, gets the embedding given from Gemini,
    and normalizes the resulting vector.
    Only the tags are embedded, not the title or description.
    """
    text = ", ".join(tags)
    emb = client.models.embed_content(model="gemini-embedding-001", contents=text)
    vec = emb.embeddings[0].values
    # normalize so dot product == cosine

    norm = math.sqrt(sum(x*x for x in vec))
    return [x / norm for x in vec] if norm > 0 else vec

print(embed_text(generate_tags(title, description)))