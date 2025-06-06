const cron = require('node-cron');
// const { buscarProximoJogoNBA } = require('../services/nbaService');
const { buscarNoticiasEsportivas } = require('../services/newsService');
const { postarNoX } = require('../services/twitterService');

function iniciarAgendamentos() {
  // cron.schedule('0 * * * *', async () => {
  //   console.log('⏰ Postando jogo da NBA...');
  //   const noticiaJogo = await buscarProximoJogoNBA();
  //   if (noticiaJogo) await postarNoX(noticiaJogo);
  // });

  cron.schedule('30 * * * *', async () => {
    console.log('⏰ Postando outra notícia esportiva...');
    const noticiaEsportiva = await buscarNoticiasEsportivas();
    if (noticiaEsportiva) await postarNoX(noticiaEsportiva);
  });
}

module.exports = { iniciarAgendamentos };
