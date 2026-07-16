# Backend

## Com UV
Para atualizar as dependências:
```bash
uv sync
```

Para rodar:
```bash
./run.sh
```
ou
```bash
uv run --env-file .env uvicorn main:app --reload --log-level debug
```
