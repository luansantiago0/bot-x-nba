const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
const { buscarNoticiasEsportivas } = require('./src/services/newsService.js');
const { postarNoX } = require('./src/services/twitterService.js');

async function main() {
  console.log('🚀 Iniciando bot...');
  const noticiaEsportiva = await buscarNoticiasEsportivas();
  if (noticiaEsportiva) await postarNoX(noticiaEsportiva);

  iniciarAgendamentos();
}

main();
