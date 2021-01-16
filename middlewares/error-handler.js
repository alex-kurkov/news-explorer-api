const errorMessage = require('../errorMessagesConfig');

const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || errorMessage.default,
  };
  // 404 and 403 errors are passed through immutated
  if (err.name === 'ValidationError') {
    error.statusCode = 401;
    error.message = err.message;
  }
  if (err.name === 'MongoError') {
    error.statusCode = 409;
    error.message = errorMessage.mongo;
  }
  if (err.name === 'CastError') {
    error.statusCode = 422;
    error.message = errorMessage.cast;
  }
  if (err.name === 'DisconnectedError') {
    error.statusCode = 503;
    error.message = errorMessage.dbDisconnected;
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
