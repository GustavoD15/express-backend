#!/bin/bash

# Cenário: Login com erro - Requisição mal formatada (JSON inválido)

echo "Tentando fazer login com JSON mal formatado (vírgula extra)"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"malformadologin@example.com\",, \"password\":\"senhaValida123\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
echo "Tentando fazer login com JSON mal formatado (falta uma chave - email)"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"password\":\"senhaValida123\"}" \
  http://localhost:3000/api/auth/login

echo "\n"
