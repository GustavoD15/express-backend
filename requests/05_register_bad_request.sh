#!/bin/bash

# Cenário: Registro com erro - Requisição mal formatada (JSON inválido)

echo "Tentando registrar usuário com JSON mal formatado (vírgula extra)"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Usuário Mal Formado\", \"email\":\"malformado@example.com\",, \"password\":\"senhaValida123\"}" \
  http://localhost:3000/api/auth/register

echo "\n"
echo "Tentando registrar usuário com JSON mal formatado (falta uma chave)"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Usuário Mal Formado 2\", \"password\":\"senhaValida123\"}" \
  http://localhost:3000/api/auth/register

echo "\n"
