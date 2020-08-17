const { celebrate, Joi } = require('celebrate');

const validationForCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationForLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationForCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

const validationForDeleteArticle = celebrate({

  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});


module.exports = {
  validationForCreateUser,
  validationForLogin,
  validationForCreateArticle,
  validationForDeleteArticle,
};
