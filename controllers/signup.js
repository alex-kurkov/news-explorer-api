const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { AuthorizationError, ConflictError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

const signup = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password || !name) {
    throw new AuthorizationError(errorMessage.authorization.incompleteWithName);
  }
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(({ _id }) => User.findById(_id).select())
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(errorMessage.conflict));
      }
      return next(err);
    });
};

module.exports = signup;
