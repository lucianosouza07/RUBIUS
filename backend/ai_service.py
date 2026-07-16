import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

# Recupera e configura a API Key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("A variável GEMINI_API_KEY não foi configurada no ambiente ou no arquivo .env")

genai.configure(api_key=api_key)

def ask_rubius_ai(prompt: str, context_data: str = None) -> str:
    """
    Envia a pergunta do usuário para o Gemini contendo dados contextuais opcionais
    sobre a Copa do Mundo.
    """
    system_instruction = (
        "Você é o Rubius, um assistente de inteligência artificial de alta performance para a Copa do Mundo. "
        "Sua personalidade é analítica, técnica, estritamente objetiva e imparcial. "
        "Responda de forma clara, focando nos dados fornecidos e evite enfeites visuais exagerados."
    )
    
    # Usando o modelo recomendado de baixo custo e alta performance
    model = genai.GenerativeModel("gemini-2.5-flash", system_instruction=system_instruction)
    
    full_prompt = ""
    if context_data:
        full_prompt += f"Considere os seguintes dados atualizados da Copa do Mundo como contexto de verdade absoluta:\n{context_data}\n\n"
    
    full_prompt += f"Pergunta do usuário: {prompt}"
    
    response = model.generate_content(
        full_prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.2, # Baixa temperatura para respostas mais objetivas e focadas
        )
    )
    
    return response.text
