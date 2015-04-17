'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:email/device', controller.selectDeviceInfo);
router.post('/:email/device', controller.insertDeviceInfo);

module.exports = router;