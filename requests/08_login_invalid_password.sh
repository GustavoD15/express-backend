#!/bin/bash

# Cenário: Login com erro - Senha inválida

EMAIL_VALIDO="usuario_valido@example.com" # Assumindo que este usuário existe e tem senha 'senhaValida123'
PASSWORD_INVALIDO="senhaInvalida123"

echo "Tentando fazer login com senha inválida para o usuário: $EMAIL_VALIDO"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL_VALIDO\", \"password\":\"$PASSWORD_INVALIDO\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
