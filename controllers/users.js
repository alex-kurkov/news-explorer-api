const User = require('../models/user');
const { NotFoundError } = require('../errors/index');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('пользователь не найден'))
    .select()
    .then((user) => res.status(200).send(user))
    .catch(next);
};
