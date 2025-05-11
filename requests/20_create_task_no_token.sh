curl --request POST \
  --url http://localhost:3000/api/tasks \
  --header 'Content-Type: application/json' \
  --data '{     "titulo": "Minha Nova Tarefa via Script",     "descricao": "Esta é uma descrição detalhada da nova tarefa.",     
 "data": "11/05/25",     
 "status": "pendente"   
}'