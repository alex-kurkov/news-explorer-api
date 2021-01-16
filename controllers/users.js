const User = require('../models/user');
const { NotFoundError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(errorMessage.notFound.user))
    .select()
    .then((user) => res.status(200).send(user))
    .catch(next);
};
