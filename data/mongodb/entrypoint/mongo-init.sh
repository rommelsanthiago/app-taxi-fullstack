#!/bin/bash

# Carrega as variáveis do arquivo .env
export $(grep -v '^#' .env | xargs)

# Verifica se todas as variáveis necessárias estão definidas
if [[ -z "root" || -z "lVlY0rM3PwS5U2cP" || -z "taxi" || -z "rommel" || -z "B3QA9BW295t6ZmVs" ]]; then
  echo "Erro: Uma ou mais variáveis do arquivo .env não foram definidas."
  exit 1
fi

# Conecta ao MongoDB e executa os comandos
mongosh --username "root" --password "lVlY0rM3PwS5U2cP" <<EOF
use taxi;

db.createUser({
    user: "rommel",
    pwd: "B3QA9BW295t6ZmVs",
    roles: [ { role: "dbOwner", db: "taxi" } ]
});

db.createCollection("rides");
EOF

echo "Usuário rommel criado com sucesso no banco taxi e a coleção rides foi adicionada."
