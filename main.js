const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
const { buscarNoticiasEsportivas } = require('./src/services/newsService.js');
const { gerarTweetCriativo } = require('./src/services/mistralService.js');
const { postarNoX } = require('./src/services/twitterService.js');

async function main() {
  console.log('🚀 Iniciando bot...');

  try {
    // Executa uma notícia imediatamente (opcional)
    const noticia = await buscarNoticiasEsportivas('UFC');
    if (noticia) {
      const tweet = await gerarTweetCriativo(noticia.conteudo);
      if (tweet) {
        await postarNoX(tweet);
      }
    } else {
      console.log('Nenhuma notícia nova para postar agora.');
    }

    // Aguarda alguns segundos para não colidir com os crons
    setTimeout(() => {
      console.log('📅 Iniciando agendamentos...');
      iniciarAgendamentos();
    }, 10000); // 10 segundos de delay antes de iniciar os crons

  } catch (err) {
    console.error('Erro na execução principal:', err.message);
  }
}

main();
