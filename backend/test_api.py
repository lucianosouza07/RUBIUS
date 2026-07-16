import httpx
import os
import asyncio
import json

WORLD_CUP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzZjZmJmNWE5YjM0NGQyYjdhNWMzMSIsImlhdCI6MTc4MTk3NzAzMiwiZXhwIjoxNzg5MjM0NjMyfQ.qsg33OYDXAz6aqtEJhVXWHOtpEVrBk-J3VpdQM3zg8c"

async def main():
    async with httpx.AsyncClient() as client:
        try:
            games_response = await client.get(
                "https://worldcup26.ir/get/games",
                headers={"Authorization": f"Bearer {WORLD_CUP_TOKEN}"}
            )
            groups_response = await client.get(
                "https://worldcup26.ir/get/groups",
                headers={"Authorization": f"Bearer {WORLD_CUP_TOKEN}"}
            )
            
            with open("api_response.json", "w", encoding="utf-8") as f:
                json.dump({"games": games_response.json(), "groups": groups_response.json()}, f, indent=4)
            print("Successfully wrote api_response.json")
        except Exception as e:
            print(f"Exception: {e}")

asyncio.run(main())
