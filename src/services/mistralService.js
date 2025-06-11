require('dotenv').config();
const { Mistral } = require('@mistralai/mistralai');

const bot = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function gerarTweetCriativo(noticiaCompleta, tentativas = 3) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const chatResponse = await bot.chat.complete({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content: `
Você é um redator criativo especialista em redes sociais, especialmente no X (antigo Twitter).

Sua tarefa é transformar uma notícia em um tweet curto, impactante e 100% ORIGINAL.

Siga estas regras:
- Nunca copie o texto original da notícia.
- Use linguagem descontraída e atual.
- Utilize emojis relevantes.
- Crie hashtags específicas e populares para o tema abordado.
- Use no máximo 280 caracteres.
- Comece direto com a ideia principal, sem introduções genéricas.

Apenas responda com o tweet. Nada mais.
            `.trim()
          },
          {
            role: 'user',
            content: noticiaCompleta
          }
        ],
      });

      return chatResponse.choices[0].message.content.trim();
    } catch (error) {
      const status = error.response?.status;
      const body = error.response?.data;

      if (status === 429 && i < tentativas - 1) {
        console.warn(`⚠️ Limite da Mistral excedido. Retentando em 15s... (${i + 1}/${tentativas})`);
        await delay(15000); // 15 segundos
      } else {
        console.error('❌ Erro ao gerar tweet com Mistral:', body || error.message);
        return null;
      }
    }
  }
}

module.exports = { gerarTweetCriativo };
