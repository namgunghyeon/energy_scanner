'use strict';

var express = require('express');
var controller = require('./appliance.controller');

var router = express.Router();

router.get('/:email/', controller.getApplianceTypeList);

module.exports = router;