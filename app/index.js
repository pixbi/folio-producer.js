
var fs = require('fs');
var qs = require('querystring');
var util = require('util');
var https = require('https');
var crypto = require('crypto');
var config = require('./config');
var client = require('./client');

exports.createSession = function createSession (email, password) {

  function createAuthHeader () {
    var timestamp = Date.now();
    var obj = {
      'oauth_consumer_key': config['consumer_key'],
      'oauth_timestamp': timestamp,
      'oauth_signature_method': 'HMAC-SHA256',
      'oauth_signature': createSignature(timestamp)
    };

    return 'OAuth ' + Object.keys(obj).map(function (k) {
      return k + '="' + obj[k] + '"'
    }).join(',');
  }

  function createOauthMessage (timestamp) {
    var query = {
      'oauth_consumer_key': config['consumer_key'],
      'oauth_signature_method': 'HMAC-SHA256',
      'oauth_timestamp': timestamp
    };
    return [
      'POST',
      encodeURIComponent(config['endpoint'] + 'webservices/sessions'),
      encodeURIComponent(qs.stringify(query))
    ].join('&');
  }

  function createSignature (timestamp) {
    var msg = createOauthMessage(timestamp);
    var hash = crypto.createHmac('sha256', config['consumer_secret']);
    hash.update(msg);
    return hash.digest('base64');
  }

  function onresponse (res) {
    console.log(res.statusCode);
  }

  var req = https.request({
    'method': 'POST',
    'headers': {
      'Authorization': createAuthHeader(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    'hostname': config['endpoint'].replace('https://', ''),
    'path': 'webservices/sessions'
  }, onresponse);

  req.end(JSON.stringify({
    'email': email,
    'password': password
  }));

  return req;
};

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
