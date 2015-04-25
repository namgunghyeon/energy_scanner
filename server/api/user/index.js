'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:email/device', controller.selectDeviceInfo);
router.post('/:email/device', controller.insertDeviceInfo);

router.post('/:email/appliances', controller.insertUserAppliance);
router.get('/:email/appliances', controller.selectUserAppliance);

router.post('/:email/defaultUserAppliance', controller.defaultUserApplianceType);
router.post('/:email/applianceType', controller.insertNewApplianceType);
router.get('/:email/applianceType', controller.getApplianceTypeList);

router.get('/:email/appliances/scan', controller.selectScanHistory); 
router.post('/:email/appliances/scan', controller.insertScanHistory);

module.exports = router;
