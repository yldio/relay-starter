import express from 'express';
import graphQLHTTP from 'express-graphql';
import {Schema} from './data/schema';
import renderOnServer from './renderOnServer';
import api from './api';

const APP_PORT = 8080;
const app = express();

app.use('/graphql', graphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.get('/', (req, res, next) => {
  renderOnServer(res, next);
});

app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile('app.js', {root: __dirname});
});

app.get('/v1/feed', api.fetchFeed);
app.get('/v1/articles/:id', api.fetchArticle);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

module.exports = app;
