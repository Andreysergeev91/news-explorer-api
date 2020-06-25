const articlesRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/articles');


articlesRouter.get('/articles', getUserArticles);
articlesRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), createArticle);
articlesRouter.delete('/articles/:articleId', celebrate({

  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articlesRouter;
