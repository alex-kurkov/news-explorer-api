const rateLimit = require('express-rate-limit');
const errorMessage = require('../errorMessagesConfig');

const rateLimiter = rateLimit({
  windowMs: 20 * 1000,
  max: 10,
  message: errorMessage.limiter,
});

module.exports = { rateLimiter };
