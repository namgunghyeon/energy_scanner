'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var config = require('../../config/environment');
var mysql = require('mysql');
var connection = mysql.createConnection(_.extend(env.MYSQL));
var fs = require('fs');
var path = require('path');

function insertQueryScanHistory(queryInfos) {
  var sql = 'INSERT INTO scan_history(user_appliance_id, start, end, totalUsage)'+
    ' VALUES(\''+ queryInfos.id +'\',FROM_UNIXTIME(\''+ queryInfos.start +'\'),FROM_UNIXTIME(\''+ queryInfos.end +'\'),\''+ queryInfos.totalUsage +'\')';

  return sql;
}

function selectQueryScanHistory(queryInfos) {
  var sql = 'SELECT A.user_appliance_id,' +
    ' UNIX_TIMESTAMP(A.start) * 1000 AS start,' +
    ' UNIX_TIMESTAMP(A.end) * 1000 AS end,' +
    ' A.id as scan_id,' +
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
    ' INNER JOIN user_device AS F' +
    ' ON F.id = B.user_device_id' +
    ' WHERE F.user_email = \'' + queryInfos.email + '\'';

  if (queryInfos.scanId) {
    sql += ' AND A.id = ' + queryInfos.scanId;
  }

  return sql;
}

exports.selectScanHistory = function(req, res) {
  var email = req.params.email || null,
      scanId = req.params.scanId || null;

  if (email === null ) {
    res.send('not found email');
    return;
  }

  var queryInfos = {
      email : email,
      scanId: scanId
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

  connection.query(sql, function (err, result) {
    if (err) {
      res.json(err);
    }

    res.json({
      code: 200,
      scanId: result.insertId
    });

  });
};

exports.selectScanRawData = function(req, res) {
  var email = req.params.email || null,
    scanId = req.query.scanId || null,
    filePath = path.join(config.root, 'server/data/');

  if (email === null ) {
    res.send('not found email');
    return;
  }

  if (scanId === null) {
    res.send('not found scanId');
    return;
  }

  fs.readFile(filePath + scanId + '.json', { encoding: 'utf8' }, function (err, data) {

    if (err) {
      res.status(400).send({
        code: 400,
        message: 'File not found',
        detail: err
      });
    } else {
      res.status(200).send({
        code: 200,
        message: 'Read data success',
        detail: JSON.parse(data)
      });
    }

  });
};

exports.insertScanRawData = function(req, res) {
  var applianceId = req.body.applianceId || null,
    scanId = req.body.scanId || null,
    rawData = req.body.rawData || [],
    filePath = path.join(config.root, 'server/data/'),
    json;

  if (applianceId === null) {
    res.send({
      code: 400,
      message: 'not found applianceId'
    });
    return;
  }

  if (scanId === null) {
    res.send({
      code: 400,
      message: 'not found scanId'
    });
    return;
  }

  if (!rawData.length) {
    res.send({
      code: 400,
      message: 'Empty raw data'
    });
    return;
  }

  json = {
    applianceId: applianceId,
    data: rawData
  };

  fs.writeFile(filePath + scanId + '.json', JSON.stringify(json), function (err) {

    if (err) {
      res.status(500).send({
        code: 500,
        message: 'Write data failed',
        detail: err
      });
    } else {
      res.status(200).send({
        code: 200,
        message: 'Write data success'
      });
    }

  });


};
