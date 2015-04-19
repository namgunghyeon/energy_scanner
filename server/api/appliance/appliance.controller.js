'use strict';

var _ = require('lodash');
var env = require('../../config/local.env');
var mysql = require('mysql');
var connection = mysql.createConnection(env.MYSQL);

// Get list of appliances
exports.getApplianceTypeList = function(req, res) {

    var sql = 'SELECT * FROM appliance_code';

      connection.query(sql, function (err, results) {

        if (err) {
          throw err;
        }
        res.json(results);

      });
};
