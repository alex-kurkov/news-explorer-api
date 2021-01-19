require('dotenv').config();

const whiteListCors = [
  'https://news.students.nomoreparties.xyz',
  'http://news.students.nomoreparties.xyz',
  'https://www.news.students.nomoreparties.xyz',
  'http://www.news.students.nomoreparties.xyz',
  'http://localhost:3000',
  'http://localhost:3005',
];

const {
  NODE_ENV, JWT_SECRET, PORT_PROD, MONGODB,
} = process.env;
const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev';
const PORT = NODE_ENV === 'production' ? PORT_PROD : 3000;
const mongoDBName = NODE_ENV === 'production'
  ? MONGODB
  : 'mongodb://localhost:27017/news-explorer';

module.exports = {
  whiteListCors, mongoDBName, PORT, SECRET,
};
