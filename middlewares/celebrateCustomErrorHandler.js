const { isCelebrateError } = require('celebrate');

const celebrateCustomErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errors = err.details.get('body') || err.details.get('params') || err.details.get('cookies');
    const error = errors.details[0];
    res.status(400).send({
      message: `Неверный запрос: ${error.context.key} ${error.message}`,
    });
  }
  next();
};

module.exports = celebrateCustomErrorHandler;
