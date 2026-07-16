import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key carregada: {api_key[:10]}...{api_key[-5:] if api_key else 'Não carregada'}")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

try:
    response = model.generate_content("Olá Gemini! Confirme que você está funcionando corretamente.")
    print("\nResposta da API:")
    print(response.text)
    print("\n[SUCESSO] Integração validada com êxito!")
except Exception as e:
    print(f"\n[ERRO] Falha ao conectar à API: {e}")
