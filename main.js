const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
const { buscarNoticiasEsportivas } = require('./src/services/newsService.js');
const { postarNoX } = require('./src/services/twitterService.js');

async function main() {
  console.log('🚀 Iniciando bot...');
  const noticia = await buscarNoticiasEsportivas('NBA');
  if (noticia) await postarNoX(noticia);

  iniciarAgendamentos();
}

main();
