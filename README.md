⚙️ Descrição do Script ⚙️

Este script foi desenvolvido em JavaScript para automatizar a solicitação de códigos de verificação para números de telefone, utilizando a biblioteca Baileys para conectar ao WhatsApp. Ele inclui:

✨ Funcionalidades:

🎨 Exibição de informações do criador com cores dinâmicas.

📂 Carregamento de números de um arquivo JSON.

📱 Entrada e validação de DDI e número de telefone.

🔒 Solicitação de código de verificação via WhatsApp.

💫 Um efeito visual dinâmico de "Carregando" antes de exibir as informações.


📚 Bibliotecas usadas:

prompt-sync para entradas do usuário. 💬

gradient-string para efeitos de texto colorido. 🌈

pino para registros de logs. 📜

fs para manipular arquivos JSON. 📂

@whiskeysockets/baileys para integração com o WhatsApp. 🤖



---

💻 Como baixar e executar no Termux ou outro terminal:

1. Instale o Git e Node.js no Termux:

pkg install git nodejs

🔧 Isso instala as ferramentas necessárias para rodar o script.


2. Clone o repositório do script no GitHub: No seu repositório GitHub, adicione os arquivos do script e siga este comando para clonar:

git clone https://github.com/Luanliaha/TSXSPMWA/tree/main

📂 Isso copia o repositório para o seu ambiente local.


3. Navegue até a pasta do script:

cd seu-repositorio

📁 Isso te coloca na pasta onde o script está salvo.


4. Instale as dependências: O script usa várias bibliotecas. Para instalar, rode:

npm install prompt-sync gradient-string pino @whiskeysockets/baileys

🛠️ Isso instala as ferramentas necessárias para o funcionamento.


5. Crie a pasta e o arquivo para armazenar os números de telefone:

mkdir files
touch files/numbers.json

📝 Isso prepara o ambiente para armazenar os números de telefone.


6. Execute o script: Agora, rode o script com o comando:

node nome-do-script.js

🚀 Agora o script está pronto para ser executado!




---

💡 Dica: Certifique-se de que o arquivo JSON esteja pronto para armazenar os números e que o Termux esteja configurado corretamente!

