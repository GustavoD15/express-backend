#!/bin/bash

# Cenário: Login com erro - E-mail não cadastrado

EMAIL_NAO_CADASTRADO="nao_existe_$(date +%s%N)@example.com"
PASSWORD_QUALQUER="qualquerSenha123"

echo "Tentando fazer login com e-mail não cadastrado: $EMAIL_NAO_CADASTRADO"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_NAO_CADASTRADO\", \"password\":\"$PASSWORD_QUALQUER\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
