#!/bin/bash

# Cenário: Login bem-sucedido

# Primeiro, garantir que um usuário exista para o login.
# Vamos registrar um novo usuário para este teste específico.
EMAIL_LOGIN="login_sucesso_$(date +%s%N)@example.com"
PASSWORD_LOGIN="senhaLogin123"
NOME_LOGIN="Usuário Login Sucesso"

echo "Registrando usuário para teste de login: $NOME_LOGIN com email: $EMAIL_LOGIN"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"$NOME_LOGIN\", \"email\":\"$EMAIL_LOGIN\", \"password\":\"$PASSWORD_LOGIN\"}" \
  http://localhost:3000/api/auth/register > /dev/null # Silenciar a saída do registro

echo "\nTentando fazer login com o usuário: $EMAIL_LOGIN"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_LOGIN\", \"password\":\"$PASSWORD_LOGIN\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
