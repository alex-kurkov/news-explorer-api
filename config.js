require('dotenv').config();

const whiteListCors = [
  'https://kurkov-news.students.nomoreparties.xyz/',
  'http://kurkov-news.students.nomoreparties.xyz/',
  'https://www.kurkov-news.students.nomoreparties.xyz/',
  'http://www.kurkov-news.students.nomoreparties.xyz/',
  'http://localhost:3000',
  'http://localhost:3005',
  'http://localhost:3001',
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
