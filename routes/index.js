const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signinValidator, signupValidator } = require('../utils/request-validators');
const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const notFoundRouter = require('./404');

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.use('*', auth, notFoundRouter);

module.exports = router;
