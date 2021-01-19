const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/index');
const errorMessage = require('../errorMessagesConfig');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError(errorMessage.notFound.articles))
    .select()
    .then((articles) => res.send(articles))
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
    .then((data) => {
      res.status(201).send({
        keyword: data.keyword,
        title: data.title,
        text: data.text,
        date: data.date,
        source: data.source,
        link: data.link,
        image: data.image,
        _id: data._id,
      });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .select('+owner')
    .orFail(new NotFoundError(errorMessage.notFound.article))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError(errorMessage.forbidden));
      }
      return article.remove();
    })
    .then((article) => res.send({ data: article }))
    .catch(next);
};
