const { buscarNoticias } = require('../services/newsService');
const { gerarTweetCriativo } = require('../services/mistralService');
const { postarNoX } = require('../services/twitterService');
const cron = require('node-cron');

function iniciarAgendamentos() {
  // NBA às 09:00
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Postando notícia da NBA...');
    const noticiaNBA = await buscarNoticias('NBA');
    if (noticiaNBA) {
      const tweet = await gerarTweetCriativo(noticiaNBA.conteudo);
      if (tweet) {
        await postarNoX(tweet);
      }
    }
  });

  // UFC às 14:00
  cron.schedule('0 11 * * *', async () => {
    console.log('⏰ Postando notícia do UFC...');
    const noticiaUFC = await buscarNoticias('UFC');
    if (noticiaUFC) {
      const tweet = await gerarTweetCriativo(noticiaUFC.conteudo);
      if (tweet) {
        await postarNoX(tweet);
      }
    }
  });

  // NFL às 20:00
  cron.schedule('0 20 * * *', async () => {
    console.log('⏰ Postando notícia da NFL...');
    const noticiaNFL = await buscarNoticias('NFL');
    if (noticiaNFL) {
      const tweet = await gerarTweetCriativo(noticiaNFL.conteudo);
      if (tweet) {
        await postarNoX(tweet);
      }
    }
  });
}

module.exports = { iniciarAgendamentos };
