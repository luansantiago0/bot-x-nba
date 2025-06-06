const cron = require('node-cron');
const { buscarNoticiasEsportivas } = require('../services/newsService');
const { postarNoX } = require('../services/twitterService');

function iniciarAgendamentos() {
  cron.schedule('30 * * * *', async () => {
    console.log('⏰ Postando outra notícia esportiva...');
    const noticiaEsportiva = await buscarNoticiasEsportivas();
    if (noticiaEsportiva) await postarNoX(noticiaEsportiva);
  });
}

module.exports = { iniciarAgendamentos };
