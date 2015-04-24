'use strict';

var express = require('express');
var controller = require('./appliance.controller');

var router = express.Router();

router.post('/:email', controller.insertUserAppliance);
router.get('/:email', controller.selectUserAppliance);

router.post('/:email/defaultUserAppliance', controller.defaultUserApplianceType);
router.post('/:email/applianceType', controller.insertNewApplianceType);
router.get('/:email/applianceType', controller.getApplianceTypeList);

module.exports = router;
