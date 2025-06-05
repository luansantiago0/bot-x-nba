const axios = require('axios');
const { parseStringPromise } = require('xml2js');

async function buscarNoticiasEsportivas() {
  try {
    const url = 'https://news.google.com/rss/search?q=NBA&hl=pt-BR&gl=BR&ceid=BR:pt-419';
    const response = await axios.get(url);
    const data = await parseStringPromise(response.data);

    const primeiraNoticia = data.rss.channel[0].item[0];
    return `📰 Notícia: ${primeiraNoticia.title[0]} - ${primeiraNoticia.link[0]}`;
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return null;
  }
}

module.exports = { buscarNoticiasEsportivas };
