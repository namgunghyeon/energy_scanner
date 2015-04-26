'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(_.extend(env.MYSQL));

function insertQueryScanHistory(queryInfos) {
  var sql = 'INSERT INTO scan_history(user_appliance_id, start, end, totalUsage)'+
    ' VALUES(\''+ queryInfos.id +'\',FROM_UNIXTIME(\''+ queryInfos.start +'\'),FROM_UNIXTIME(\''+ queryInfos.end +'\'),\''+ queryInfos.totalUsage +'\')';

  return sql;
}

function selectQueryScanHistory(queryInfos) {
  var sql = 'SELECT A.user_appliance_id,' +
    ' UNIX_TIMESTAMP(A.start) * 1000 AS start,' +
    ' UNIX_TIMESTAMP(A.end) * 1000 AS end,' +
    ' A.totalUsage,' +
    ' B.mode1,' +
    ' B.mode2,' +
    ' B.model,' +
    ' E.name ' +
    ' FROM scan_history AS A' +
    ' INNER JOIN user_appliance AS B' +
    ' ON B.id = A.user_appliance_id' +
    ' INNER JOIN user_appliance_type AS D' +
    ' ON D.id = B.user_appliance_type_id' +
    ' INNER JOIN appliance_code AS E' +
    ' ON E.code = D.appliance_code' +
    ' WHERE B.user_email = \'' + queryInfos.email + '\'';

  return sql;
}

exports.selectScanHistory = function(req, res) {
  var email = req.params.email || null;

  if (email === null ) {
    res.send('not fount email');
    return;
  }

  var queryInfos = {
      email : email
    },
    sql = selectQueryScanHistory(queryInfos);

  connection.query(sql, function (err, results) {

    if (err) {
      res.json(err);
    }
    res.json(results);
  });
};

exports.insertScanHistory = function(req, res) {
  var start = req.body.start || null,
    end = req.body.end || null,
    totalUsage = req.body.totalUsage || null,
    id = req.body.id || null;

  if (start === null) {
    res.send('not found start');
    return;
  }

  if (end === null) {
    res.send('not found end');
    return;
  }

  if (totalUsage === null) {
    res.send('not found totalUsage');
    return;
  }

  if (id === null) {
    res.send('not found user_appliance_id');
    return;
  }

  var queryInfos = {
    start : start / 1000,
    end : end / 1000,
    totalUsage : totalUsage,
    id : id
  };

  var sql = insertQueryScanHistory(queryInfos);

  connection.query(sql, function (err, results) {
    if (err) {
      res.json(err);
    }
    res.json('200');

  });
};
