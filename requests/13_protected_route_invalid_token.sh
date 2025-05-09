#!/bin/bash

# Cenário: Tentativa de acesso a /secureExampleRoute com token JWT inválido

TOKEN_INVALIDO="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cINVALIDPARTHERE"

echo "Tentando acessar /secureExampleRoute com um token JWT INVÁLIDO..."

curl -X GET \
  -H "Authorization: Bearer $TOKEN_INVALIDO" \
  http://localhost:3000/secureExampleRoute

echo "\n"
