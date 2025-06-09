const cron = require('node-cron');
const { buscarNoticiasEsportivas } = require('../services/newsService');
const { postarNoX } = require('../services/twitterService');

function iniciarAgendamentos() {
  // NBA às 09:00
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Postando notícia da NBA...');
    const noticiaNBA = await buscarNoticiasEsportivas('NBA');
    if (noticiaNBA) await postarNoX(noticiaNBA);
  });

  // UFC às 14:00
  cron.schedule('0 14 * * *', async () => {
    console.log('⏰ Postando notícia do UFC...');
    const noticiaUFC = await buscarNoticiasEsportivas('UFC');
    if (noticiaUFC) await postarNoX(noticiaUFC);
  });

  // NFL às 20:00
  cron.schedule('0 20 * * *', async () => {
    console.log('⏰ Postando notícia da NFL...');
    const noticiaNFL = await buscarNoticiasEsportivas('NFL');
    if (noticiaNFL) await postarNoX(noticiaNFL);
  });
}

module.exports = { iniciarAgendamentos };
