curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.0.2' \
  --data '{
    "email": "seuemail@example.com",
    "password": "suaSenhaSuperForte1234"
}
'