const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const validate = require('mongoose-validator');

const AuthorizationError = require('../middlewares/errors/authorization-error');


const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'There should be an Email adress in this field',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});


userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthorizationError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
