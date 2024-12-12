const { createTwitterClient } = require('../utils/twitter-client');
const { validateEnvironment, validateUser } = require('../utils/twitter-validator');
const logger = require('../utils/logger');

class TwitterService {
  constructor() {
    this.lastTweetId = null;
    this.client = createTwitterClient();
  }

  async getUserByUsername(username) {
    validateEnvironment(username);
    const user = await this.client.v2.userByUsername(username);
    validateUser(user, username);
    return user;
  }

  async getLatestTweets(userId) {
    return await this.client.v2.userTimeline(userId, {
      exclude: ['retweets', 'replies'],
      max_results: 5,
      since_id: this.lastTweetId,
    });
  }

  updateLastTweetId(tweets) {
    if (tweets.data && tweets.data.length > 0) {
      this.lastTweetId = tweets.data[0].id;
    }
  }

  logTweets(tweets, username) {
    if (tweets.data && tweets.data.length > 0) {
      logger.info(`Found ${tweets.data.length} new tweets from @${username}:`);
      tweets.data.forEach(tweet => logger.tweet(tweet));
    } else {
      logger.info(`No new tweets found from @${username} in the last minute`);
    }
  }
}

module.exports = TwitterService;