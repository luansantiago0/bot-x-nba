const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const { noticiaJaPostada, adicionarAoCache } = require('../utils/cache');

async function buscarNoticiasEsportivas(termo) {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(termo)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    const response = await axios.get(url);
    const data = await parseStringPromise(response.data);

    const itens = data.rss.channel[0].item;

    for (const item of itens) {
      const link = item.link[0];
      if (!noticiaJaPostada(link)) {
        adicionarAoCache(link);
        const titulo = item.title[0];
        const hashtags = gerarHashtags(titulo);
        return `📰 ${termo.toUpperCase()}: ${titulo} - ${link} ${hashtags}`;
      }
    }

    console.log(`Nenhuma nova notícia de ${termo}`);
    return null;
  } catch (error) {
    console.error(`Erro ao buscar notícia de ${termo}:`, error);
    return null;
  }
}

function gerarHashtags(titulo) {
  const palavrasChave = ['NBA', 'UFC', 'NFL', 'playoffs', 'finals', 'luta', 'basquete', 'futebol', 'americano'];
  const hashtags = palavrasChave
    .filter(palavra => titulo.toLowerCase().includes(palavra.toLowerCase()))
    .map(tag => `#${tag.toUpperCase()}`);
  return hashtags.length ? hashtags.join(' ') : '';
}

module.exports = { buscarNoticiasEsportivas };
