import striptags from 'striptags';
const feedJson = require('../newsfeed.json');

module.exports = {
  fetchFeed: (req, res) => {
    feedJson.articles.map(article => {
      article.text = striptags(article.text);
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(feedJson);
  },
  fetchArticle: (req, res) => {
    const article = articlesJson.find(article => {
      return article.id === parseInt(req.params.id, 10);
    });
    res.send(article);
  },
};
