import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getFeed,
  getArticle,
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Newsfeed') {
      return getFeed();
    } else if (type === 'Article') {
      return getArticle(id);
    } else {
      return null;
    }
  },
  (obj) => {
    const item = JSON.parse(obj);
    return item && item.type === 'Newsfeed' ?
      newsfeedType :
      articleType;
  }
);

const newsfeedType = new GraphQLObjectType({
  name: 'Newsfeed',
  description: 'my newsfeed',
  fields: () => ({
    id: globalIdField('Newsfeed'),
    articles: {
      type: articleConnection,
      description: 'articles',
      args: connectionArgs,
      resolve: (newsfeed, args) => {
        return getFeed()
          .then((body) => {
            const res = JSON.parse(body);
            return connectionFromArray(res.articles, args);
          })
          .catch((err) => err);
      },
    },
  }),
  interfaces: [nodeInterface],
});

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'an article',
  fields: () => ({
    id: globalIdField('Article'),
    title: {
      type: GraphQLString,
      description: 'The title',
    },
    author: {
      type: GraphQLString,
      description: 'The author',
    },
    text: {
      type: GraphQLString,
      description: 'The body of the article',
    },
  }),
  interfaces: [nodeInterface],
});

const {connectionType: articleConnection} =
  connectionDefinitions({name: 'Article', nodeType: articleType});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    newsfeed: {
      type: newsfeedType,
      resolve: () => {
        return getFeed()
          .then((body) => {
            return JSON.parse(body);
          })
          .catch((err) => err);
      },
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});

