#!/bin/bash

# Cenário: Login com erro - E-mail inválido (formato incorreto)

EMAIL_INVALIDO="usuario_invalido"
PASSWORD_QUALQUER="qualquerSenha123"

echo "Tentando fazer login com e-mail em formato inválido: $EMAIL_INVALIDO"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL_INVALIDO\", \"password\": \"$PASSWORD_QUALQUER\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
