const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = require('../config');
const { AuthorizationError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

const signin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AuthorizationError(errorMessage.authorization.incomplete);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = signin;
