'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);

// Get list of users
exports.insertDeviceInfo = function(req, res) {
    var email = req.params.email || null,
        serial = req.body.serial || null,
        deviceHash = req.body.hash || null;

    if (email === null ) {
        res.send('not fount email');
        return;
    }

    if (deviceHash === null) {
        res.send('not fount deviceHash');
        return;
    }

    if (serial === null) {
        res.send('not fount serial');
        return;
    }

    var sql = 'INSERT INTO user_device(user_email, serial, device_hash)' +
        ' VALUES(\''+ email +'\',\''+ serial +'\',\''+ deviceHash +'\')' +
        ' ON DUPLICATE KEY UPDATE user_email= \'' + email + '\',' +
        ' serial =  \'' + serial + '\',' + 
        ' device_hash =  \'' + deviceHash + '\'';

      connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json('200');

      });
};

exports.selectDeviceInfo = function(req, res) {
    var email = req.params.email || null;

    if (email === null ) {
        res.send('not fount email');
        return;
    }

    var sql = 'SELECT serial, device_hash FROM user_device' +
        ' WHERE user_email =   \'' + email + ' \'';

      connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json(results);

      });
};