
var https = require('https');
var config = require('./config');
var client = require('./client');

exports.createFolio = function createFolio (name, num, magazineTitle, width, height) {
  
  var req = https.request({
    'method': 'POST',
    'headers': {
      // TODO
    }
  });

  req.end(JSON.stringify({
    'folioName': name,
    'folioNumber': num,
    'magazineTitle': magazineTitle,
    'resolutionWidth': width,
    'resolutionHeight': height
  }));

  return req;
};

exports.createArticle = function createArticle (filePath, folioId) {
  var req = https.request({
    'method': 'POST',
    'headers': {
      // TODO
    }
  });

  req.end(JSON.stringify({
    'filepath': filePath,
    'folio_id': folioId
  }));

  return req;
};

exports.createSession = function createSession (email, password) {
  var req = https.request({
    'method': 'POST',
    'headers': {
      // TODO: auth required
    }
  });

  req.end(JSON.stringify({
    'email': email,
    'password': password
  }));

  return req;
};

exports.deleteArticle = function deleteArticle (articleId, folioId) {
  var req = https.request({
    'method': 'DELETE',
    'headers': {
      // TODO
    }
  });

  req.end(JSON.stringify({
    'article_id': articleId,
    'folio_id': folioId
  }));

  return req;
};

exports.deleteFolio = function deleteIssue (id) {
  var req = https.request({
    'method': 'DELETE',
    'headers': {
      // TODO
    }
  });

  req.end(JSON.stringify({
    'folio_id': id
  }));

  return req;
};

exports.deleteSession = function deleteSession () {
  var req = https.request({
    'method': 'DELETE',
    'headers': {
      // TODO
    }
  });

  req.end(JSON.stringify({
    'cancelToken': true
  }));

  return req;
};

exports.uploadHTMLResources = function uploadHTMLResources (filePath, folioId) {
  var req = https.request({
    'method': 'POST',
    'headers': {
      // TODO
    }
  });

  fs.createReadStream(filePath).pipe(req);
  return req;
};
