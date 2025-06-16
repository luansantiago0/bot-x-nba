const { buscarNoticias } = require('./src/services/newsService.js');
const { gerarTweetCriativo } = require('./src/services/mistralService.js');
const { postarNoX } = require('./src/services/twitterService.js');
const { iniciarAgendamentos } = require('./src/jobs/scheduler.js');
const { iniciarWhatsappBot } = require('./src/services/whatsappService.js');

async function main() {
  console.log('🚀 Iniciando bot...');

  try {
    // Postagem inicial opcional
    const noticia = await buscarNoticias('UFC');
    if (noticia) {
      const tweet = await gerarTweetCriativo(noticia.conteudo);
      if (tweet) {
        await postarNoX(tweet);
      }
    }

    iniciarWhatsappBot();

    // Aguarda antes de iniciar os agendamentos
    setTimeout(() => {
      console.log('📅 Iniciando agendamentos...');
      iniciarAgendamentos();
    }, 10000);

  } catch (err) {
    console.error('Erro na execução principal:', err.message);
  }
}

main();
