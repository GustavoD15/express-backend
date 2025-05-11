curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "Seu Nome",
    "email": "seuemail@example.com",
    "password": "1234"
}
'