#!/bin/bash

# Cenário: Registro com erro - Senha inválida (curta, menos de 5 caracteres)

EMAIL="usuario_senha_curta_$(date +%s%N)@example.com"
PASSWORD="1234" # Senha com 4 caracteres
NOME="Usuário Senha Curta"

echo "Tentando registrar usuário: $NOME com email: $EMAIL e senha curta"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"$NOME\", \"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  http://localhost:3000/api/auth/register

echo "\n"
