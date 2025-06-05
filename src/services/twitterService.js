const { TwitterApi } = require('twitter-api-v2');
const config = require('../config');

const client = new TwitterApi({
  appKey: config.apiKey,
  appSecret: config.apiSecret,
  accessToken: config.accessToken,
  accessSecret: config.accessSecret,
});

async function postarNoX(texto) {
  try {
    await client.v2.tweet(texto);
    console.log('✅ Postado com sucesso!');
  } catch (error) {
    console.error('Erro ao postar no X:', error);
  }
}

module.exports = { postarNoX };
