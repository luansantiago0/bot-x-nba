require('dotenv').config();
const { Mistral } = require('@mistralai/mistralai');

const bot = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

async function gerarTweetCriativo(noticiaCompleta) {
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
          `
        },
        {
          role: 'user',
          content: noticiaCompleta
        }
      ],
    });

    return chatResponse.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao gerar tweet com Mistral:', error.response?.data || error.message);
    return null;
  }
}

module.exports = { gerarTweetCriativo };
