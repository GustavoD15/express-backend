#!/bin/bash

# Cenário: Acesso a /secureExampleRoute com token JWT válido

# Primeiro, fazer login para obter um token JWT válido
# Usaremos um usuário criado especificamente para este teste ou um usuário genérico
EMAIL_LOGIN="test_token_user_$(date +%s%N)@example.com"
PASSWORD_LOGIN="validPassword123"
NOME_LOGIN="Test Token User"

echo "Registrando usuário para obter token: $EMAIL_LOGIN"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"$NOME_LOGIN\", \"email\":\"$EMAIL_LOGIN\", \"password\":\"$PASSWORD_LOGIN\"}" \
  http://localhost:3000/api/auth/register > /dev/null

echo "Fazendo login para obter token..."
LOGIN_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_LOGIN\", \"password\":\"$PASSWORD_LOGIN\"}" \
  http://localhost:3000/api/auth/login)

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
  echo "Falha ao obter o token JWT. Resposta do login:"
  echo $LOGIN_RESPONSE
  exit 1
fi

echo "Token JWT obtido: $TOKEN"
echo "\nTentando acessar /secureExampleRoute com o token JWT válido..."

curl -X GET \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/secureExampleRoute

echo "\n"
