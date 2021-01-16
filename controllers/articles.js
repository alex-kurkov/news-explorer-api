const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError(errorMessage.notFound.articles))
    .select()
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: { _id: req.user._id },
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .select('+owner')
    .orFail(new NotFoundError(errorMessage.notFound.article))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError(errorMessage.forbidden.articleDelete));
      }
      return Article.findByIdAndRemove(id);
    })
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};
