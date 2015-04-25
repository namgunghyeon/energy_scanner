'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);

// Get list of appliances

function selectQueryUserApplianceTypeByEmail(queryInfos) {
    var sql = 'SELECT A.id, B.code, A.desc, B.name FROM user_appliance_type AS A INNER JOIN appliance_code AS B' +
            '  ON A.appliance_code = B.code' +
            ' WHERE user_email = \''+ queryInfos.email +'\'';

    return sql;
}

exports.getApplianceTypeList = function(req, res) {
    var email = req.params.email || null;

    if (email === null ) {
        res.send('not fount email');
        return;
    }

    var queryInfos = {
            email : email,
        },
    sql = selectQueryUserApplianceTypeByEmail(queryInfos);

    connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json(results);

    });
};
