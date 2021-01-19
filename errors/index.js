const UnauthorizedError = require('./unauthorized-error');
const NotFoundError = require('./not-found-error');
const ValidationError = require('./validation-error');
const ConflictError = require('./conflict-error');
const ForbiddenError = require('./forbidden-error');

module.exports = {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
  ConflictError,
  ForbiddenError,
};
