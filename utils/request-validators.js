const { celebrate, Joi } = require('celebrate');
const { regExpEmail, regExpUrl } = require('./regExps');

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regExpEmail)
      .message({
        'string.pattern.base': 'поле должно быть валидным email',
      }),
    password: Joi.string().required().min(6)
      .message({
        'string.min': 'не меньше 6 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'не меньше 2 символов',
        'string.max': 'не более 30 символов',
      }),
  }).messages({
    'string.empty': 'поле должно быть непустой строкой',
    'any.required': 'обязательное поле',
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regExpEmail)
      .message({
        'string.pattern.base': 'поле должно быть валидным email',
      }),
    password: Joi.string().required().min(6)
      .message({
        'string.min': 'не меньше 6 символов',
      }),
  }).messages({
    'string.empty': 'поле должно быть непустой строкой',
    'any.required': 'обязательное поле',
  }),
});

const postArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    image: Joi.string().required().pattern(regExpUrl)
      .message({
        'string.pattern.base': 'поле image должно быть валидной ссылкой',
      }),
    link: Joi.string().required().pattern(regExpUrl)
      .message({
        'string.pattern.base': 'поле link должно быть валидной ссылкой',
      }),
  }).messages({
    'string.empty': 'поле должно быть непустой строкой',
    'any.required': 'обязательное поле',
  }),
});

const deleteArticleValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }).messages({
    'string.length': 'id должен состоять из 24 символов',
    'any.required': 'обязательное поле',
  }),
});

module.exports = {
  signinValidator,
  signupValidator,
  postArticleValidator,
  deleteArticleValidator,
};
