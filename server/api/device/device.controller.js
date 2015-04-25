'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(_.extend(env.MYSQL));
var request = require('request');

function selectQueryDevice(queryInfos) {
  var sql = 'SELECT serial, device_hash, label FROM user_device' +
    ' WHERE user_email =   \'' + queryInfos.email + ' \'';

  return sql;
}

function insertQueryDevice(queryInfos) {
  var sql = 'INSERT INTO user_device(user_email, serial, device_hash, label)' +
    ' VALUES(\''+ queryInfos.email +'\',\''+ queryInfos.serial +'\',\''+ queryInfos.deviceHash +'\',\''+ queryInfos.label +'\')' +
    ' ON DUPLICATE KEY UPDATE user_email= \'' + queryInfos.email + '\',' +
    ' serial =  \'' + queryInfos.serial + '\',' +
    ' device_hash =  \'' + queryInfos.deviceHash + '\',' +
    ' label =  \'' + queryInfos.label + '\'';

  return sql;
}

exports.selectDeviceInfo = function(req, res) {
  var email = req.params.email || null;

  if (email === null ) {
    res.send('not fount email');
    return;
  }

  var queryInfos = {
      email : email
    },
    sql = selectQueryDevice(queryInfos);

  connection.query(sql, function (err, results) {

    if (err) {
      res.json(err);
    }
    res.json(results);
  });
};

exports.insertDeviceInfo = function(req, res) {
    var email = req.params.email || null,
        serial = req.body.serial || null,
        deviceHash = req.body.hash || null,
        label = req.body.label || null;

    if (email === null ) {
        res.json('not fount email');
        return;
    }

    if (deviceHash === null) {
        res.json('not fount deviceHash');
        return;
    }

    if (serial === null) {
        res.json('not fount serial');
        return;
    }
    var queryInfos = {
            email : email,
            deviceHash : deviceHash,
            serial : serial,
            label: label
        },
        sql = insertQueryDevice(queryInfos);
        console.log(sql);


    connection.query(sql, function (err, results) {

    if (err) {
      throw err;
    }

    res.json('200');

    });
};

exports.getRealtimeUsage = function (req, res) {

  var deviceHash = req.query.deviceHash || env.DEMO_DEVICE_HASH,
    endpoint = env.API.DOMAIN + '/1.1/devices/' + deviceHash + '/realtimeInfo',
    encodedApiKey = env.API.KEY;

  request({
    method: 'GET',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encodedApiKey
    },
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
