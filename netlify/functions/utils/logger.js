const logger = {
  error: (message, error) => {
    console.error(`Error: ${message}`, error);
  },
  info: (message) => {
    console.log(message);
  },
  tweet: (tweet) => {
    console.log(`- ${tweet.text}\n`);
  }
};

module.exports = logger;