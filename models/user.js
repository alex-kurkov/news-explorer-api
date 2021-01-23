const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validate.isEmail(v);
      },
      message: ({ value }) => `${value} - некорректный email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});
userSchema.statics.findUserByCredentials = function bar(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMessage.authorization.unauthorized));
      }
      return bcrypt.compare(password, user.password)
        .then((passwordCorrect) => {
          if (!passwordCorrect) {
            return Promise.reject(new UnauthorizedError(errorMessage.authorization.unauthorized));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
