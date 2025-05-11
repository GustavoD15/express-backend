curl --request POST \
  --url http://localhost:3000/api/tasks \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBhYjViZjAyYzI0NzUwODFhMDcxZiIsImVtYWlsIjoic2V1ZW1haTJsQGV4YW1wbGUuY29tIiwibm9tZSI6IlNldSBOb21lMiIsImlhdCI6MTc0Njk3MjE3NywiZXhwIjoxNzQ2OTc1Nzc3fQ.iIYhGS7T5mKUy62BtoWun0UjZJffr3lc2GVpVEBJZKw' \
  --header 'Content-Type: application/json' \
  --data '{     "titulo": "Nova Tarefa via Script",     "descricao": "Esta é uma descrição detalhada da nova tarefa.",     
 "data": "11/05/25",     
 "status": "pendente"   
}'