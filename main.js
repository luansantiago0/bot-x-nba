const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
// const { buscarProximoJogoNBA } = require('./src/services/nbaService.js');
const { buscarNoticiasEsportivas } = require('./src/services/newsService.js');
const { postarNoX } = require('./src/services/twitterService.js');

async function main() {
  console.log('🚀 Iniciando bot...');
  
  // const noticiaJogo = await buscarProximoJogoNBA();
  // if (noticiaJogo) await postarNoX(noticiaJogo);

  const noticiaEsportiva = await buscarNoticiasEsportivas();
  if (noticiaEsportiva) await postarNoX(noticiaEsportiva);

  iniciarAgendamentos();
}

main();
