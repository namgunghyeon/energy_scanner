'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:email/device', controller.selectDeviceInfo);
router.get('/:email/appliances/scan', controller.selectScanList); 

router.post('/:email/appliances/scan', controller.insertScanHistory);
router.post('/:email/appliances', controller.insertUserAppliance);
router.post('/:email/device', controller.insertDeviceInfo);

module.exports = router;
