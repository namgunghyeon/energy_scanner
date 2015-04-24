'use strict';

var express = require('express');
var controller = require('./device.controller');

var router = express.Router();

router.get('/:email', controller.selectDeviceInfo);
router.post('/:email', controller.insertDeviceInfo);

module.exports = router;
