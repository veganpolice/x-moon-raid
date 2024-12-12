const { createTwitterClient } = require('./twitter-client');

// Store the latest tweet ID in memory (note: this will reset on cold starts)
let lastTweetId = null;

exports.handler = async function(event, context) {
  try {
    const twitterClient = createTwitterClient();
    const targetUsername = process.env.TWITTER_USERNAME;

    if (!targetUsername) {
      console.log('Error: TWITTER_USERNAME environment variable is not set');
      return { statusCode: 500 };
    }

    // Get user ID from username
    const user = await twitterClient.v2.userByUsername(targetUsername);
    if (!user.data) {
      console.log(`Error: Could not find user ${targetUsername}`);
      return { statusCode: 404 };
    }

    // Fetch latest tweets
    const tweets = await twitterClient.v2.userTimeline(user.data.id, {
      exclude: ['retweets', 'replies'],
      max_results: 5,
      since_id: lastTweetId,
    });

    if (tweets.data && tweets.data.length > 0) {
      console.log(`Found ${tweets.data.length} new tweets from @${targetUsername}:`);
      tweets.data.forEach(tweet => {
        console.log(`- ${tweet.text}\n`);
      });
      
      // Update the last tweet ID
      lastTweetId = tweets.data[0].id;
    } else {
      console.log(`No new tweets found from @${targetUsername} in the last minute`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tweet check completed' })
    };
  } catch (error) {
    console.error('Error checking tweets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to check tweets' })
    };
  }
};