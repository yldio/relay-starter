import React from 'react';
import Relay from 'react-relay';
import Article from './Article';

class NewsFeed extends React.Component {
  loadMore() {
    const count = this.props.relay.variables.count;
    this.props.relay.setVariables({
      count: count + 5,
    });
  }

  render() {
    const articles = this.props.newsfeed.articles.edges;
    return (
      <div>
        {articles.map((article, i) => <Article article={article.node} key={i}/>)}
        <button onClick={() => this.loadMore()}>Load More</button>
      </div>
    );
  }
}

export default Relay.createContainer(NewsFeed, {
  initialVariables: {
    count: 5,
  },
  fragments: {
    newsfeed: () => Relay.QL`
      fragment on Newsfeed {
        articles(first: $count) {
          edges {
            node {
              id,
              ${Article.getFragment('article')}
            },
            cursor,
          },
          pageInfo {
            hasPreviousPage,
            hasNextPage
          }
        },
      }
    `,
  },
});
