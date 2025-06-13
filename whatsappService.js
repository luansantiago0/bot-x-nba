const wa = require('@open-wa/wa-automate');
const { buscarNoticiasEsportivas } = require('./src/services/newsService');
const { gerarTweetCriativo } = require('./src/services/mistralService');

wa.create().then(client => {
  console.log('🤖 Bot do WhatsApp iniciado!');

  client.onMessage(async message => {
    if (message.body.startsWith('!')) {
      const termo = message.body.slice(1).trim();
      if (!termo) {
        await client.sendText(message.from, '❌ Você precisa digitar algo após o "!". Ex: !UFC');
        return;
      }

      console.log(`🔍 Buscando notícia sobre: ${termo}`);

      const noticia = await buscarNoticiasEsportivas(termo);
      if (noticia) {
        const tweet = await gerarTweetCriativo(noticia.conteudo);
        if (tweet) {
          await client.sendText(message.from, `🧠 Aqui está uma notícia sobre *${termo}*:\n\n${tweet}`);
        } else {
          await client.sendText(message.from, `⚠️ Não consegui gerar o texto criativo para "${termo}".`);
        }
      } else {
        await client.sendText(message.from, `😕 Não encontrei nenhuma notícia recente sobre *${termo}*. Tente outro assunto.`);
      }
    }
  });
});
