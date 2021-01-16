const whiteListCors = [
  'https://news.students.nomoreparties.xyz',
  'http://news.students.nomoreparties.xyz',
  'https://www.news.students.nomoreparties.xyz',
  'http://www.news.students.nomoreparties.xyz',
  'http://localhost:3000',
];
const mongoDBName = 'mongodb://localhost:27017/news-explorer';

module.exports = { whiteListCors, mongoDBName };
