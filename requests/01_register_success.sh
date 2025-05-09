#!/bin/bash

# Cenário: Registro bem-sucedido

EMAIL="usuario_sucesso_$(date +%s%N)@example.com"
PASSWORD="senhaForte123"
NOME="Usuário de Sucesso"

echo "Tentando registrar usuário: $NOME com email: $EMAIL"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"$NOME\", \"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  http://localhost:3000/api/auth/register

echo "\n"
