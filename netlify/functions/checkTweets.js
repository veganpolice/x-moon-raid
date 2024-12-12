const TwitterService = require('./services/twitter-service');
const logger = require('./utils/logger');

exports.handler = async function(event, context) {
  const twitterService = new TwitterService();
  
  try {
    const username = process.env.TWITTER_USERNAME;
    const user = await twitterService.getUserByUsername(username);
    const tweets = await twitterService.getLatestTweets(user.data.id);
    
    twitterService.logTweets(tweets, username);
    twitterService.updateLastTweetId(tweets);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tweet check completed' })
    };
  } catch (error) {
    logger.error('Failed to check tweets', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};