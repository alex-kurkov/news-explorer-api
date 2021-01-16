const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorMessage = require('../errorMessagesConfig');
const { SECRET } = require('../config');
const { AuthorizationError } = require('../errors/index');

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
      res
        .status(200)
        .send({ token });
    })
    .catch(next);
};

module.exports = signin;
