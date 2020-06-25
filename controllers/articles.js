const mongoose = require('mongoose');
const Article = require('../models/article');
const BadRequestError = require('../middlewares/errors/bad-request-error');
const getStatusCodeByError = require('./getStatusCodeByError');
const NotfoundError = require('../middlewares/errors/not-found-error');
const ForbiddenError = require('../middlewares/errors/forbidden-error');


module.exports.getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.deleteArticle = (req, res, next) => {
  if (!(mongoose.Types.ObjectId.isValid(req.params.articleId))) {
    return next(new BadRequestError('Введен некорректный id'));
  }
  Article.findById(req.params.articleId)
    .orFail(new NotfoundError('Статья с данным Id не найдена'))
    .then((article) => {
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Статья создана другим пользователем');
      }
      Article.deleteOne(article, (err) => {
        if (err) {
          throw err;
        } else {
          res.send({ data: article });
        }
      });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => getStatusCodeByError(err, next));
};
