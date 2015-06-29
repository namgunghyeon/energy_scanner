'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var BUCKET_NAME = 'energy-scanner';

exports.getObject = function (key, cb) {
  var params = {Bucket: BUCKET_NAME, Key: key};

  try {
    s3.getObject(params, function (err, data) {
      console.log('data: ', data);
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }

    });
  } catch (e) {
    console.log(e);
  }

};

exports.putObject = function (key, data, cb) {
  var params = {Bucket: BUCKET_NAME, Key: key, Body: data};

  s3.putObject(params, function (err, data) {

    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }

  });
};
