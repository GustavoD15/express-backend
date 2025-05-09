#!/bin/bash

# Cenário: Registro com erro - E-mail já cadastrado

# Primeiro, registrar um usuário para garantir que o e-mail exista
EMAIL_EXISTENTE="usuario_existente_$(date +%s%N)@example.com"
PASSWORD_EXISTENTE="senhaForte123"
NOME_EXISTENTE="Usuário Existente"

echo "Tentando registrar o primeiro usuário (para garantir que o e-mail exista): $NOME_EXISTENTE com email: $EMAIL_EXISTENTE"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"$NOME_EXISTENTE\", \"email\":\"$EMAIL_EXISTENTE\", \"password\":\"$PASSWORD_EXISTENTE\"}" \
  http://localhost:3000/api/auth/register > /dev/null # Silenciar a saída do primeiro registro

echo "\nTentando registrar um NOVO usuário com o MESMO email: $EMAIL_EXISTENTE"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Outro Nome\", \"email\":\"$EMAIL_EXISTENTE\", \"password\":\"outraSenha123\"}" \
  http://localhost:3000/api/auth/register

echo "\n"
