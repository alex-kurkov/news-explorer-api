const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 20 * 1000,
  max: 10,
  message: 'Слишком много запросов, попробуйте еще через 20 секунд',
});

module.exports = { rateLimiter };
