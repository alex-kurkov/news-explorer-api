const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { AuthorizationError } = require('../errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthorizationError('Авторизация отклонена - отсутствует или неправильно передан токен');
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev',
    );
  } catch (e) {
    throw new AuthorizationError('Авторизация отклонена - токен не валиден или истек');
  }
  req.user = payload;
  next();
};
