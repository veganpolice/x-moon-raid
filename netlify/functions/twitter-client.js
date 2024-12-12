const { TwitterApi } = require('twitter-api-v2');

function createTwitterClient() {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  return client.readOnly;
}

module.exports = { createTwitterClient };