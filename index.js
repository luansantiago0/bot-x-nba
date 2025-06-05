require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');
const cron = require('node-cron');

// Configurando cliente do Twitter
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Função para buscar notícia da NBA
async function buscarNoticiaNBA() {
  try {
    const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4387';
    const response = await axios.get(url);
    const evento = response.data.events[0];

    return `🏀 Próximo jogo: ${evento.strEvent} em ${evento.dateEvent} #NBA`;
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return null;
  }
}

// Função para postar no X
async function postarNoX(texto) {
  try {
    await client.v2.tweet(texto);
    console.log('✅ Postado com sucesso!');
  } catch (error) {
    console.error('Erro ao postar no X:', error);
  }
}

// Função principal
async function main() {
  const noticia = await buscarNoticiaNBA();
  if (noticia) {
    await postarNoX(noticia);
  }
}

// Agendando para rodar a cada hora
cron.schedule('0 * * * *', () => {
  console.log('⏰ Executando bot...');
  main();
});

// Executa imediatamente ao iniciar
main();
