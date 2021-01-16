const { isCelebrateError } = require('celebrate');

const celebrateCustomErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errors = err.details.get('body') || err.details.get('params');
    // NB! joi options key 'abortEarly' is set to true by default - so there can be only 1 error!
    // NB! will try to expand to actual MAP when working on frontend to send all invalid messages
    // in one response for better UX
    const onlyError = errors.details[0];
    res.status(400).send({
      message: `Неверный запрос. Ошибка в поле '${onlyError.context.key}' - ${onlyError.message}`,
    });
  } else {
    next(err);
  }
};

module.exports = celebrateCustomErrorHandler;
