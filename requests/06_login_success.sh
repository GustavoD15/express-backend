curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "seuemail@example.com",
    "password": "suaSenhaSuperForte123"
}'