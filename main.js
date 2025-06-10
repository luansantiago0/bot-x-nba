const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
const { buscarNoticiasEsportivas } = require('./src/services/newsService.js');
const { gerarTweetCriativo } = require('./src/services/mistralService.js');
const { postarNoX } = require('./src/services/twitterService.js');

async function main() {
  console.log('🚀 Iniciando bot...');
  const noticia = await buscarNoticiasEsportivas('UFC');

  if (noticia) {
    const tweet = await gerarTweetCriativo(noticia.conteudo);
    if (tweet) {
      await postarNoX(tweet);
    }
  } else {
    console.log('Nenhuma notícia nova para postar.');
  }

  iniciarAgendamentos();
}


main();
