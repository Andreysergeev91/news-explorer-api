const articlesRouter = require('express').Router();

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/articles');

const { validationForCreateArticle, validationForDeleteArticle } = require('./request-validation');

const auth = require('../middlewares/auth');


articlesRouter.get('/articles', auth, getUserArticles);

articlesRouter.post('/articles', auth, validationForCreateArticle, createArticle);

articlesRouter.delete('/articles/:articleId', auth, validationForDeleteArticle, deleteArticle);

module.exports = articlesRouter;
