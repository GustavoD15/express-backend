curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.0.2' \
  --data '{
    "nome": "Seu Nome",
    "email": "seuemail@example.com",
    "password": "suaSenhaSuperForte123"
}
'