import request from 'request';

export function getFeed() {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:8080/v1/feed', function(err, res, body) {
      const statusCode = res && res.statusCode;
      if (err) {
        return reject(new Error(`${statusCode}: ${err.message}`));
      }
      return resolve(body);
    });
  });
}

export function getArticle(id) {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:8080/v1/articles/${id}`, function(err, res, body) {
      const statusCode = res && res.statusCode;
      if (err) {
        return reject(new Error(`${statusCode}: ${err.message}`));
      }
      return resolve(body);
    });
  });
}
