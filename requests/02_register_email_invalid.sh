## Register - Email inválido (sem @)

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome":"Usuário Teste","email":"usuario.teste.com","password":"senhaForte123"}' \
  http://localhost:3000/api/auth/register

