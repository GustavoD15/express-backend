#!/bin/bash

# Cenário: Tentativa de acesso a /secureExampleRoute sem token JWT

echo "Tentando acessar /secureExampleRoute SEM token JWT..."

curl -X GET \
  http://localhost:3000/secureExampleRoute

echo "\n"
