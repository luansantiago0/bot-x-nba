const axios = require('axios');

async function buscarProximoJogoNBA() {
  try {
    const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4387';
    const response = await axios.get(url);
    const evento = response.data.events[0];

    return `🏀 Próximo jogo: ${evento.strEvent} em ${evento.dateEvent} #NBA`;
  } catch (error) {
    console.error('Erro ao buscar jogo NBA:', error);
    return null;
  }
}

module.exports = { buscarProximoJogoNBA };
