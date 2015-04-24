'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var request = require('request');

exports.signin = function (req, res) {

  var endpoint = env.API.DOMAIN + '/1.1/users/basicinfo/signin',
    encodedApiKey = env.API.KEY,
    credentials = _.extend(req.body, {app_version: 'web'});

  request({
    method: 'POST',
    url: endpoint,
    headers: {
      'Authorization': 'Basic ' + encodedApiKey
    },
    body: credentials,
    json: true
  }, function (err, response, body) {

    var statusCode = response.statusCode;

    if (err) {
      res.status(statusCode).send(err);
    } else {
      res.status(statusCode).send(body);
    }

  });

};

exports.signup = function (req, res) {
  res.send('This API is work in progress!');
};



