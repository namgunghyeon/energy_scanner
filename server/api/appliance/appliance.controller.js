'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);

function insertQueryUserAppliance(queryInfos) {
  var sql = 'INSERT IGNORE INTO user_appliance(user_device_id, model, user_appliance_type_id, mode1, mode2)'+
    ' VALUES(\''+ queryInfos.userDeviceId +'\',\''+ queryInfos.model +'\',\''+ queryInfos.id +'\',\''+ queryInfos.mode1 +'\',\''+ queryInfos.mode2 +'\')';
    return sql;
}

function selectQueryUserAppliance(queryInfos) {
  var sql = 'SELECT A.id, A.user_appliance_type_id,' +
    '               A.user_device_id,' +
    '               A.model, A.mode1,' +
    '               A.mode2, B.user_email,' +
    '               B.serial, B.device_hash,' +
    '               B.label '+
    ' FROM user_appliance AS A' +
    '  INNER JOIN user_device AS B' +
    '          ON A.user_device_id = B.id' +
    ' WHERE A.model = \'' + queryInfos.model + '\'' +
    '   AND A.user_appliance_type_id =\'' + queryInfos.id + '\'' +
    '   AND B.user_email = \'' + queryInfos.email + '\'';

  return sql;
}

function alreadyExistsUserAppliance(queryInfos, callback){
  var sql = selectQueryUserAppliance(queryInfos);
  console.log(sql);
  connection.query(sql, function (err, results) {

    if (err) {
      callback(err);
    }

    callback(null, results);
  });
}

function insertUserAppliance(queryInfos, callback){

  var sql = selectQueryUserApplianceType(queryInfos);
  console.log(sql);
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

        if (result !== null || result !== undefined) {

          var insertData = {
            id : result.insertId,
            email : queryInfos.email,
            userDeviceId : queryInfos.userDeviceId,
            model : queryInfos.model,
            mode1 : queryInfos.mode1 || 'null',
            mode2 : queryInfos.mode2 || 'null'
          };

          callback(null, [insertData]);

        } else {
          callback(null, null);
        }
      });

    } else {
      callback('user_appliance_id not match');
    }
  });
}

function selectQueryUserApplianceByEmail(queryInfos) {
  var sql = 'SELECT A.id, D.id AS userDeviceId, D.user_email, A.model, B.desc, C.name FROM user_appliance AS A' +
    '  INNER JOIN user_appliance_type AS B ON B.id = A.user_appliance_type_id' +
    '  INNER JOIN appliance_code AS C ON C.code = B.appliance_code' +
    '  INNER JOIN user_device AS D ON A.user_device_id = D.id' +
    ' WHERE D.user_email = \''+ queryInfos.email +'\'';

  return sql;
}

function selectApplianceCode(){
  return 'SELECT * FROM appliance_code';
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

function insertQueryUserApplianceType(queryInfos) {
  var sql = 'INSERT INTO user_appliance_type(appliance_code, user_email, `desc`, name)' +
    ' VALUES(\''+ queryInfos.appCode +'\',\''+ queryInfos.email +'\',\''+ queryInfos.desc +'\',\''+ queryInfos.name +'\')';

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

exports.insertUserAppliance = function(req, res) {

  var model = req.body.model || null,
    id = req.body.id || null,
    email = req.params.email || null,
    userDeviceId = req.body.userDeviceId || null,
    mode1 = req.body.mode1 || null,
    mode2 = req.body.mode2 || null,
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

  if (userDeviceId === null) {
    res.json('not found userDeviceId');
    return;
  }

  var queryInfos = {
    model : model,
    id  : id,
    email : email,
    desc : desc,
    mode1 : mode1,
    mode2 : mode2,
    userDeviceId : userDeviceId
  };

  alreadyExistsUserAppliance(queryInfos, function(err, result){
    if (result.length <= 0) {

      insertUserAppliance(queryInfos, function(err, insertData){

        if (err){
          res.json(err);
        } else {
          res.json(insertData[0]);
        }
      });

    } else {

      res.json({
        id : result[0].id,
        email : result[0].user_email,
        userDeviceId : result[0].user_device_id,
        model : result[0].model,
        mode1 : result[0].mode1,
        mode2 : result[0].mode2
      });
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
    desc = req.body.desc || null,
    name = req.body.name;

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

  if (name === null) {
    res.json('not found desc');
    return;
  }

  if (appCode !== 'A5') {
    res.json('appCode is not etc');
    return;
  }

  var queryInfos = {
      email : email,
      appCode  : appCode,
      desc : desc,
      name : name
    },
    sql = insertQueryUserApplianceType(queryInfos);

  connection.query(sql, function (err, result) {

    if (err) {
      throw err;
    }
    if (result !== null || result !== undefined) {

      queryInfos.id = result.insertId;
      res.json(queryInfos);
    } else {
      res.json('not insert');
    }
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
