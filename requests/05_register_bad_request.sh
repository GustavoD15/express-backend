curl --request POST \
  --url http://localhost:3000/api/auth/register \
  --header 'Content-Type: application/json' \
  --data '{"nome":"Usuário Mal Formado", "email":"malformadoundefined'