function validateEnvironment(username) {
  if (!username) {
    throw new Error('TWITTER_USERNAME environment variable is not set');
  }
}

function validateUser(user, username) {
  if (!user.data) {
    throw new Error(`Could not find user ${username}`);
  }
}

module.exports = {
  validateEnvironment,
  validateUser
};