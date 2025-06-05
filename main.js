const { iniciarAgendamentos } = require('./jobs/scheduler');
const { buscarProximoJogoNBA } = require('./services/nbaService');
const { buscarNoticiasEsportivas } = require('./services/newsService');
const { postarNoX } = require('./services/twitterService');

async function main() {
  console.log('🚀 Iniciando bot...');
  
  const noticiaJogo = await buscarProximoJogoNBA();
  if (noticiaJogo) await postarNoX(noticiaJogo);

  const noticiaEsportiva = await buscarNoticiasEsportivas();
  if (noticiaEsportiva) await postarNoX(noticiaEsportiva);

  iniciarAgendamentos();
}

main();
