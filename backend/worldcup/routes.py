from fastapi import APIRouter, HTTPException
from cachetools import TTLCache, keys
from asyncache import cached
from pydantic import BaseModel
from ai_service import ask_rubius_ai

import httpx
import logging
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

TOKEN_COOKIE_NAME = "token"
WORLD_CUP_TOKEN = os.getenv("WORLD_CUP_TOKEN")

router = APIRouter()
logger = logging.getLogger("uvicorn.error")

async_cache = TTLCache(maxsize=100, ttl=300)
lock = asyncio.Lock()

def cache_key(client, url, timeout, headers):
    return keys.hashkey(url)

@cached(async_cache, key=cache_key)
async def cached_get(client: httpx.AsyncClient, url: str, timeout: int, headers):
    response = await client.get(url, timeout=timeout, headers=headers)
    response.raise_for_status()
    return response.json()


@router.get("/ext/teams")
async def get_teams():
    async with httpx.AsyncClient() as client:
        try:
            data = await cached_get(
                client,
                url="https://worldcup26.ir/get/teams",
                timeout=60,
                headers={"Authorization": f"Bearer {WORLD_CUP_TOKEN}"},
            )
            return data.get("teams", data)
        except Exception as e:
            logger.error("Failed to get teams")
            raise HTTPException(404)

@router.get("/ext/groups")
async def get_groups():
    async with httpx.AsyncClient() as client:
        try:
            data = await cached_get(
                client,
                url="https://worldcup26.ir/get/groups",
                timeout=60,
                headers={"Authorization": f"Bearer {WORLD_CUP_TOKEN}"},
            )
            return data.get("groups", data)
        except Exception as e:
            logger.error("Failed to get groups")
            raise HTTPException(404)

@router.get("/ext/games")
async def get_games():
    async with httpx.AsyncClient() as client:
        try:
            data = await cached_get(
                client,
                url="https://worldcup26.ir/get/games",
                timeout=60,
                headers={"Authorization": f"Bearer {WORLD_CUP_TOKEN}"},
            )
            return data.get("games", data)
        except Exception as e:
            logger.error("Failed to get games")
            raise HTTPException(404)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat_with_rubius(request: ChatRequest):
    context_parts = []
    try:
        teams = await get_teams()
        context_parts.append(f"Times Participantes: {teams}")
    except Exception as e:
        logger.error(f"Failed to get teams for context: {e}")
    
    try:
        groups = await get_groups()
        context_parts.append(f"Grupos da Copa: {groups}")
    except Exception as e:
        logger.error(f"Failed to get groups for context: {e}")
    
    try:
        games = await get_games()
        context_parts.append(f"Jogos e Resultados: {games}")
    except Exception as e:
        logger.error(f"Failed to get games for context: {e}")
    
    context_data = "\n\n".join(context_parts) if context_parts else None
    
    try:
        response_text = await asyncio.to_thread(ask_rubius_ai, prompt=request.message, context_data=context_data)
        return {"response": response_text}
    except Exception as e:
        logger.error(f"Error in ask_rubius_ai: {e}")
        raise HTTPException(status_code=500, detail=str(e))

