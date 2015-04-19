'use strict';

var express = require('express');
var controller = require('./appliance.controller');

var router = express.Router();

router.get('/', controller.getApplianceTypeList);

module.exports = router;