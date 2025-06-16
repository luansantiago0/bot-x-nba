const wa = require('@open-wa/wa-automate');
const { buscarNoticias } = require('./newsService.js');
const { gerarTweetCriativo } = require('./mistralService.js');
const path = require('path');

async function iniciarWhatsappBot() {
  const client = await wa.create();

  console.log('🤖 Bot do WhatsApp iniciado!');

  client.onMessage(async message => {
    if (message.body.startsWith('!')) {
      const termo = message.body.slice(1).trim();
      if (!termo) {
        await client.sendText(message.from, '❌ Você precisa digitar algo após o "!". Ex: !UFC');
        return;
      }

      console.log(`🔍 Buscando notícia sobre: ${termo}`);

      const noticia = await buscarNoticias(termo);
      if (noticia) {
        const tweet = await gerarTweetCriativo(noticia.conteudo);
        if (tweet) {
          const imagemPath = path.resolve(__dirname, '../../assets/noticia.png');
          const legenda = `🧠 *${termo.toUpperCase()}*\n\n${tweet}\n\n🔗 ${noticia.link}`;
          await client.sendImage(
            message.from,
            imagemPath,
            'noticia.png',
            legenda
          );
        } else {
          await client.sendText(message.from, `⚠️ Não consegui gerar o texto criativo para "${termo}".`);
        }
      } else {
        await client.sendText(message.from, `😕 Não encontrei nenhuma notícia recente sobre *${termo}*. Tente outro assunto.`);
      }
    }
  });
}

module.exports = { iniciarWhatsappBot };
