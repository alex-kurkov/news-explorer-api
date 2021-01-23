const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const { UnauthorizedError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.authorization.noToken);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      SECRET,
    );
  } catch (e) {
    throw new UnauthorizedError(errorMessage.authorization.invalidToken);
  }
  req.user = payload;
  next();
};
