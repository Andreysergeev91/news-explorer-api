const mainRouter = require('express').Router();

const NotfoundError = require('../middlewares/errors/not-found-error');


mainRouter.use('/', require('./users'));

mainRouter.use('/', require('./articles'));

mainRouter.all('*', (req, res, next) => next(new NotfoundError('Запрашиваемый ресурс не найден')));


module.exports = mainRouter;
