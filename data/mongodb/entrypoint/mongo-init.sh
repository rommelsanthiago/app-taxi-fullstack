#!/bin/bash

# Carrega as variáveis do arquivo .env
export $(grep -v '^#' .env | xargs)

# Verifica se todas as variáveis necessárias estão definidas
if [[ -z "$MONGODB_ROOT_USER" || -z "$MONGODB_ROOT_PASSWORD" || -z "$MONGODB_DATABASE" || -z "$MONGODB_USER" || -z "$MONGODB_PASSWORD" ]]; then
  echo "Erro: Uma ou mais variáveis do arquivo .env não foram definidas."
  exit 1
fi

# Conecta ao MongoDB e executa os comandos
mongosh --username "$MONGODB_ROOT_USER" --password "$MONGODB_ROOT_PASSWORD" <<EOF
use $MONGODB_DATABASE;

db.createUser({
    user: "$MONGODB_USER",
    pwd: "$MONGODB_PASSWORD",
    roles: [ { role: "dbOwner", db: "$MONGODB_DATABASE" } ]
});

db.createCollection("rides");
EOF

echo "Usuário $MONGODB_USER criado com sucesso no banco $MONGODB_DATABASE e a coleção rides foi adicionada."
