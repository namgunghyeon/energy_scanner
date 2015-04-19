'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);


function insertQueryUserAppliance(email, applianceId) {
   var userApplinceInserQuery = 'INSERT IGNORE INTO user_appliance(user_email, appliance_id)'+
        ' VALUES(\''+ email +'\',\''+ applianceId +'\')';
        
    return userApplinceInserQuery;
}

function selectQueryUserAppliance(email, applianceId) {
   var userApplinceSelectQuery = 'SELECT * FROM user_appliance'+
        ' WHERE user_email = \''+ email +'\'' +
        ' AND appliance_id  = \''+ applianceId +'\'';

    return userApplinceSelectQuery;
}

function insertQueryScanHistory(applianceId, start, end, mode1, mode2, totalUsage) {
    var scanHistoryQuery = 'INSERT INTO scan_history(user_appliance_id, start, end, mode1, mode2, totalUsage)'+
        ' VALUES(\''+ applianceId +'\',\''+ start +'\',\''+ end +'\',\''+ mode1 +'\',\''+ mode2 +'\',\''+ totalUsage +'\')';

        return scanHistoryQuery;
}

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


exports.selectScanList = function(req, res) {
    var email = req.params.email || null;

    if (email === null ) {
        res.send('not fount email');
        return;
    }

  var sql = 'SELECT A.start,' +
           ' A.end,' +
           ' A.totalUsage,' +
           ' A.mode1,' +
           ' A.mode2,' +
           ' C.model,' +
           ' C.appliance_code' +
         ' FROM scan_history AS A' +
         ' INNER JOIN user_appliance AS B' +
                ' ON B.id = A.user_appliance_id' +
        ' INNER JOIN appliance AS C' +
                ' ON C.id = B.appliance_id' +
    ' WHERE B.user_email = \'' + email + '\'';

      connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json(results);

      });
};

exports.insertUserAppliance = function(req, res) {

    var model = req.body.model || null,
        applianceCode = req.body.applianceCode || null,
        email = req.params.email || null;

    if (model === null ) {
        res.send('not fount applianceCode');
        return;
    }

    if (applianceCode === null) {
        res.send('not fount applianceCode');
        return;
    }

    var sql = 'SELECT * '+
            ' FROM appliance' +
            ' WHERE model = \'' + model + '\'' +
            '   AND appliance_code =\'' + applianceCode + '\'';

      connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }

        if (results.length > 0) {
            
            sql = selectQueryUserAppliance(email, results[0].id);

            connection.query(sql, function (err, userAppliances) {
                if (err) {
                  throw err;
                }
                
                if (userAppliances.length <= 0) {

                    sql = insertQueryUserAppliance(email, results[0].id);

                    connection.query(sql, function (err, results) {
                        if (err) {
                          throw err;
                        }
                        res.json('200');
                    });

                } else {
                    res.json('200'); 
                }
            });

        } else {

            sql = 'INSERT INTO appliance(model, appliance_code)'+
                   ' VALUES(\''+ model +'\',\''+ applianceCode +'\')';

            connection.query(sql, function (err, result) {
                if (err) {
                  throw err;
                }

                sql = insertQueryUserAppliance(email, result.insertId);

                connection.query(sql, function (err, results) {
                    if (err) {
                      throw err;
                    }
                    res.json('200');

                });

            });

        }
        
      });
};

exports.insertScanHistory = function(req, res) {
    var model = req.body.model || null,
        applianceCode = req.body.applianceCode || null,
        start = req.body.start || null,
        end = req.body.end || null,
        mode1 = req.body.mode1 || 'NULL',
        mode2 = req.body.mode2 || 'NULL',
        totalUsage = req.body.totalUsage || null,
        email = req.params.email || null;

    if (model === null ) {
        res.send('not fount applianceCode');
        return;
    }

    if (applianceCode === null) {
        res.send('not fount applianceCode');
        return;
    }

    if (start === null) {
        res.send('not fount start');
        return;
    }

    if (end === null) {
        res.send('not fount end');
        return;
    }

    if (totalUsage === null) {
        res.send('not fount totalUsage');
        return;
    }

    var sql = 'SELECT B.id '+
        ' FROM appliance AS A' +
        ' INNER JOIN user_appliance AS B'+
        '         ON B.appliance_id = A.id' +
        ' WHERE A.model = \'' + model + '\'' +
        '   AND A.appliance_code =\'' + applianceCode + '\'' +
        '   AND B.user_email = \'' + email + '\'';

        console.log(sql);
    connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }

        if (results.length > 0) {
            sql = insertQueryScanHistory(results[0].id, start, end, mode1, mode2, totalUsage);

            connection.query(sql, function (err, results) {
                if (err) {
                  throw err;
                }
                res.json('200');

            });

        } else {
            res.json('no appliance');
        }
    });
};










