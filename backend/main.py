from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

#configure the cors for communication with frontend(frontend -> backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], #To be changed later after deployment
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AffirmationRequest(BaseModel):
    name: str
    feeling: str

#My main endpoint 
@app.post("/api/affirmation")
async def get_affirmation(data: AffirmationRequest):
    #Small check
    if not data.name.strip() or not data.feeling.strip():
        raise HTTPException(status_code=400, detail="Name and feeling cannot be empty")
    
    try:
        response = client.chat.completions.create(
            model= "gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """You are a warm and empathetic affirmation coach.
                    Your job is to generate short, personalized therapeutic affirmations.
                    Rules you must always follow:
                    -Never give medical or legal advice
                    -Never diagnose any condition
                    -If the user express self-harm intent, respond with a warm supportive message and encourage them to seek professional help
                    -Keep responses to 2-4 sentences only
                    -Be warm, specific to what the user shared, and uplifting
                    -Never be generic or robotic"""
                },
                {
                    "role": "user",
                    "content":f"My name is {data.name} and I am feeling {data.feeling}"
                }
            ],
            max_tokens=150,
            temperature=0.7,
        )

        affirmation = response.choices[0].message.content
        return {"affirmation": affirmation}
    
    except Exception as e:
        raise HTTPException(status_code=502, detail="Something went wrong with the AI service. Please try again.")