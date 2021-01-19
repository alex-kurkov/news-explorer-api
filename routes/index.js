const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signinValidator, signupValidator } = require('../utils/request-validators');
const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const notFoundController = require('../controllers/404');

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);
router.all('*', auth, notFoundController);

module.exports = router;
