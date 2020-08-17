const usersRouter = require('express').Router();

const {
  getUserInfo, createUser, login, signOut,
} = require('../controllers/users');

const { validationForCreateUser, validationForLogin } = require('./request-validation');

const auth = require('../middlewares/auth');


usersRouter.post('/signup', validationForCreateUser, createUser);

usersRouter.post('/signin', validationForLogin, login);

usersRouter.get('/users/me', auth, getUserInfo);

usersRouter.get('/signout', auth, signOut);


module.exports = usersRouter;
