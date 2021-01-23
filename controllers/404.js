const { NotFoundError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

const notFound = (req, res, next) => {
  Promise.reject(new NotFoundError(errorMessage.notFound.route))
    .catch(next);
};

module.exports = notFound;
