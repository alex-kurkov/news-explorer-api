const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { AuthorizationError } = require('../errors/index');

const signup = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password || !name) throw new AuthorizationError('не предоставлены email, пароль или имя');
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(({ _id }) => User.findById(_id).select())
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = signup;
