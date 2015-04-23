'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);

function insertQueryUserAppliance(queryInfos) {
   var sql = 'INSERT IGNORE INTO user_appliance(user_email, model, user_appliace_type_id)'+
        ' VALUES(\''+ queryInfos.email +'\',\''+ queryInfos.model +'\',\''+ queryInfos.id +'\')';

    return sql;
}

function insertQueryScanHistory(queryInfos) {
    var sql = 'INSERT INTO scan_history(user_appliance_id, start, end, mode1, mode2, totalUsage)'+
        ' VALUES(\''+ queryInfos.id +'\',\''+ queryInfos.start +'\',\''+ queryInfos.end +'\',\''+ queryInfos.mode1 +'\',\''+ queryInfos.mode2 +'\',\''+ queryInfos.totalUsage +'\')';

        return sql;
}

function selectApplianceCode(){
    return 'SELECT * FROM appliance_code';
}

function selectQueryScanHistory(queryInfos) {
  var sql = 'SELECT A.user_appliance_id,' +
       ' A.start,' +
       ' A.end,' +
       ' A.totalUsage,' +
       ' A.mode1,' +
       ' A.mode2,' +
       ' B.model,' +
       ' E.name ' +
     ' FROM scan_history AS A' +
     ' INNER JOIN user_appliance AS B' +
            ' ON B.id = A.user_appliance_id' +
     ' INNER JOIN user_appliance_type AS D' +
            ' ON D.id = B.user_appliace_type_id' +
     ' INNER JOIN appliance_code AS E' +
            ' ON E.code = D.appliance_code' +
     ' WHERE B.user_email = \'' + queryInfos.email + '\'';

     return sql;
}

function selectQueryUserAppliance(queryInfos) {
    var sql = 'SELECT * '+
        ' FROM user_appliance' +
        ' WHERE model = \'' + queryInfos.model + '\'' +
        '   AND user_appliace_type_id =\'' + queryInfos.id + '\'' +
        '   AND user_email = \'' + queryInfos.email + '\'';

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

function selectQueryDevice(queryInfos) {
    var sql = 'SELECT serial, device_hash, label FROM user_device' +
        ' WHERE user_email =   \'' + queryInfos.email + ' \'';

    return sql;
}

function insertQueryUserApplianceType(queryInfos) {
     var sql = 'INSERT INTO user_appliance_type(appliance_code, user_email, `desc`)' +
            ' VALUES(\''+ queryInfos.appCode +'\',\''+ queryInfos.email +'\',\''+ queryInfos.desc +'\')';

        return sql;
}

function selectQueryUserApplianceType(queryInfos) {
    var sql = 'SELECT * FROM user_appliance_type WHERE id = \''+ queryInfos.id +'\'';

    return sql;
}

function selectQueryUserApplianceTypeByEmail(queryInfos) {
    var sql = 'SELECT A.id, B.code, A.desc, B.name FROM user_appliance_type AS A INNER JOIN appliance_code AS B' +
            '  ON A.appliance_code = B.code' +
            ' WHERE user_email = \''+ queryInfos.email +'\'';

    return sql;
}

function selectQueryUserApplianceByEmail(queryInfos) {
    var sql = 'SELECT A.id, A.user_email, A.model, B.desc, C.name FROM user_appliance AS A' +
            '  INNER JOIN user_appliance_type AS B ON B.id = A.user_appliace_type_id' +
            '  INNER JOIN appliance_code AS C ON C.code = B.appliance_code' +
            ' WHERE A.user_email = \''+ queryInfos.email +'\'';

    return sql;
}


function getApplianceCode(callback) {
    var sql = selectApplianceCode();
    connection.query(sql, function (err, results) {
        if (err) {
          throw err;
        }
        return  callback(null, results);
    });
}

function defaultUserApplianceType(queryInfos, callback) {
    getApplianceCode(function(err, results){
        if (err) {
          throw err;
        }

        var sql ='INSERT INTO user_appliance_type(appliance_code, user_email) VALUES',
            i = 0;

        for (i = 0; i < results.length; i = i + 1) {
            sql += (i === 0 ? '(\'' : ', (\'') + results[i].code + '\', \'' + queryInfos.email + '\')'
        }
        connection.query(sql, function (err, results) {

            if (err) {
              throw err;
            }

            callback(null, null)
        });
    });
}

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

exports.defaultUserApplianceType = function (req, res){
    var email = req.params.email || null;

    if (email === null ) {
        res.json('not fount email');
        return;
    }

    var queryInfos = {
            email : email
        };

    defaultUserApplianceType(queryInfos, function(err, results){
        if (err) {
          throw err;
        }
        res.json('200');
    });
};

exports.insertNewApplianceType = function(req, res){
    var email = req.params.email || null,
        appCode = req.body.appCode || null,
        desc = req.body.desc || null;

    if (email === null ) {
        res.json('not found email');
        return;
    }

    if (appCode === null) {
        res.json('not found appCode');
        return;
    }

    if (desc === null) {
        res.json('not found desc');
        return;
    }

    if (appCode != 'A5') {
        res.json('appCode is not etc');
        return;
    }

    var queryInfos = {
            email : email,
            appCode  : appCode,
            desc : desc
        },
        sql = insertQueryUserApplianceType(queryInfos);

    connection.query(sql, function (err, result) {

        if (err) {
          throw err;
        }
        if (result != null || results != undefined) {

            queryInfos.id = result.insertId;
            res.json(queryInfos);
        } else {
            res.json('not insert');
        }
    });
};

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

function alreadyExistsUserAppliance(queryInfos, callback){
    var sql = selectQueryUserAppliance(queryInfos);
    connection.query(sql, function (err, results) {

        if (err) {
          callback(err);
        }

        console.log(sql);
        callback(null, results);
    });
}

function insertUserAppliance(queryInfos, callback){

    var sql = selectQueryUserApplianceType(queryInfos);
     connection.query(sql, function (err, results) {

        if (err) {
          callback(err);
        }

        if (results.length > 0) {

            sql = insertQueryUserAppliance(queryInfos);
            connection.query(sql, function (err, result) {

                if (err) {
                  callback(err);
                }

                if (result != null || result != undefined) {

                    var insertData = {
                        id : result.insertId,
                        email : queryInfos.email,
                        model : queryInfos.model
                    }
                    callback(null, [insertData]);

                } else {
                    callback(null, null);
                }
            });

        } else {
             callback(null, 'user_appliance_id not match');
        }
    });
}

exports.insertUserAppliance = function(req, res) {

    var model = req.body.model || null,
        id = req.body.id || null,
        email = req.params.email || null,
        desc  = req.body.desc || null;

    if (model === null ) {
        res.json('not found model');
        return;
    }

    if (id === null) {
        res.json('not found applianceCode');
        return;
    }

    if (email === null) {
        res.json('not found email');
        return;
    }

    var queryInfos = {
            model : model,
            id  : id,
            email : email,
            desc : desc
        };

    alreadyExistsUserAppliance(queryInfos, function(err, result){
        if (result.length <= 0) {

            insertUserAppliance(queryInfos, function(err, insertData){
                if (err){
                    res.json(err);
                } else {
                    res.json(insertData)
                }
            });

        } else {
            console.log(result);
            res.json([{
                id : result[0].id,
                email : result[0].user_email,
                model : result[0].model
            }]);
        }
    });
};

exports.selectUserAppliance = function(req, res){
    var email = req.params.email || null;

    if (email === null) {
        res.json('not found email');
        return;
    }

    var queryInfos = {
            email : email
        };

    var sql = selectQueryUserApplianceByEmail(queryInfos);

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
        mode1 = req.body.mode1 || 'NULL',
        mode2 = req.body.mode2 || 'NULL',
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
            start : start,
            end : end,
            totalUsage : totalUsage,
            id : id,
            mode1 : mode1,
            mode2 : mode2
        };

    var sql = insertQueryScanHistory(queryInfos);
    connection.query(sql, function (err, results) {
        if (err) {
          res.json(err);
        }
        res.json('200');

    });
};

exports.getApplianceTypeList = function(req, res) {
    var email = req.params.email || null;

    if (email === null ) {
        res.send('not fount email');
        return;
    }

    var queryInfos = {
            email : email
        },
      sql = selectQueryUserApplianceTypeByEmail(queryInfos);

    connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json(results);

    });
};






