const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../../cache.json');

function carregarCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      fs.writeFileSync(CACHE_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(CACHE_FILE, 'utf8');
    if (!data) {
      // Arquivo vazio
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar cache:', error);
    // Em caso de erro de parse, zera o cache
    return [];
  }
}

function salvarCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function noticiaJaPostada(link) {
  const cache = carregarCache();
  return cache.includes(link);
}

function adicionarAoCache(link) {
  const cache = carregarCache();
  if (!cache.includes(link)) {
    cache.push(link);
    salvarCache(cache);
  }
}

module.exports = {
  carregarCache,
  salvarCache,
  noticiaJaPostada,
  adicionarAoCache,
};
