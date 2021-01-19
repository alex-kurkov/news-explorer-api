const errorMessage = require('../errorMessagesConfig');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || errorMessage.default;
  res.status(status).send({ message });
  return next();
};

module.exports = errorHandler;
