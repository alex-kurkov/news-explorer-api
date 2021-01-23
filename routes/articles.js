const router = require('express').Router();
const {
  getArticles, postArticle, deleteArticle,
} = require('../controllers/articles');
const {
  deleteArticleValidator,
  postArticleValidator,
} = require('../utils/request-validators');

router.get('/', getArticles);
router.post('/', postArticleValidator, postArticle);
router.delete('/:id', deleteArticleValidator, deleteArticle);

module.exports = router;
