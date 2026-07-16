from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from groq import Groq
import os


GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_PROMPT = "Você é um agente feito para ajudar as pessoas à buscarem informações sobre a Copa do Mundo."

client = Groq(api_key=GROQ_API_KEY)
router = APIRouter()


class ChatPayload(BaseModel):
    message: str

@router.post("/ext/agent")
async def send_chat_message(payload: ChatPayload):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="empty")

    try:
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
              { "role": "system", "content": GROQ_PROMPT},
              { "role": "user", "content": payload.message }

            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=False,
            stop=None
        )
        ai_response = completion.choices[0].message.content
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq Error: {str(e)}")
