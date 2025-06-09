const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../../cache.json');

function carregarCache() {
  if (!fs.existsSync(CACHE_FILE)) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(CACHE_FILE, 'utf8');
  return JSON.parse(data);
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
  noticiaJaPostada,
  adicionarAoCache,
};
