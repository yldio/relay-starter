import React from 'react';
import Relay from 'react-relay';

class Article extends React.Component {
  render() {
    const article = this.props.article;

    return (
      <div>
        <h2>{article.title}</h2>
        <h3>{article.author}</h3>
        <p>{article.text}</p>
      </div>
    );
  }
}
export default Relay.createContainer(Article, {
  fragments: {
    article: () => Relay.QL`
      fragment on Article {
        id
        title
        author
        text
      }
    `,
  },
});

