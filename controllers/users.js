const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const getStatusCodeByError = require('./getStatusCodeByError');
const AuthorizationError = require('../middlewares/errors/authorization-error');


module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: { name: user.name, email: user.email } }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: { _id: user._id, name, email } }))
    .catch((err) => getStatusCodeByError(err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 168 * 3600000,
        httpOnly: true,
        sameSite: 'none',
      });
      res.send({ token });
    })
    .catch(() => next(new AuthorizationError('Неправильная почта или пароль')));
};

// eslint-disable-next-line no-unused-vars
module.exports.signOut = (req, res, next) => {
  res.cookie('jwt', '', {
    path: '/',
    signed: false,
    maxAge: -1,
    expires: new Date(0),
  });
  res.json({
    data: { message: 'signout successed' },
  });
};
