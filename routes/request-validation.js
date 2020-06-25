const { celebrate, Joi } = require('celebrate');

const validationForCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
});

const validationForLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
});

module.exports = {
  validationForCreateUser,
  validationForLogin,
};
