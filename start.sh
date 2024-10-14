#!/bin/bash

# Verificar se o Node.js está instalado, caso contrário, instalar
if ! command -v node &> /dev/null
then
    echo "Node.js não está instalado. Instalando..."
    pkg install nodejs -y
fi

# Verificar se o Git está instalado, caso contrário, instalar
if ! command -v git &> /dev/null
then
    echo "Git não está instalado. Instalando..."
    pkg install git -y
fi

# Instalar as dependências do projeto (caso o diretório do projeto já tenha um package.json)
echo "Instalando pacotes npm necessários..."
npm install

# Loop infinito para limpar a tela e executar o script Node.js
while true
do
    clear
    echo "Executando o script Node.js..."
    node index.js # ou o nome do seu script
    sleep 1  # Adicionar um intervalo de 1 segundo entre as execuções para evitar sobrecarregar o sistema
done
while :
do
clear
node index.js
done
