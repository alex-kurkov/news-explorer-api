const { celebrate, Joi } = require('celebrate');
const validate = require('validator');
const errorMessage = require('../errorMessagesConfig');

const defaultMessages = {
  'string.empty': errorMessage.validation.empty,
  'any.required': errorMessage.validation.required,
  'object.unknown': errorMessage.validation.unknown,
};

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validate.isEmail(value)) {
        return value;
      }
      return helpers.message(errorMessage.validation.email);
    }),
    password: Joi.string().required().min(6)
      .message({
        'string.min': errorMessage.validation.min6,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': errorMessage.validation.min2,
        'string.max': errorMessage.validation.max30,
      }),
  }).messages(defaultMessages),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validate.isEmail(value)) {
        return value;
      }
      return helpers.message(errorMessage.validation.email);
    }),
    password: Joi.string().required().min(6)
      .message({
        'string.min': errorMessage.validation.min6,
      }),
  }).messages(defaultMessages),
});

const postArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validate.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessage.validation.url);
    }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validate.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessage.validation.url);
    }),
  }).messages(defaultMessages),
});

const deleteArticleValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .length(24)
      .message({ 'string.length': errorMessage.validation.length24 })
      .required(),
  }).messages(defaultMessages),
});

module.exports = {
  signinValidator,
  signupValidator,
  postArticleValidator,
  deleteArticleValidator,
};
