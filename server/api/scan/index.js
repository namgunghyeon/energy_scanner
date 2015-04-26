'use strict';

var express = require('express');
var controller = require('./scan.controller');

var router = express.Router();

router.get('/:email/history', controller.selectScanHistory);
router.get('/:email/history/:scanId', controller.selectScanHistory);
router.post('/:email/history', controller.insertScanHistory);
router.get('/:email/rawData', controller.selectScanRawData);
router.post('/:email/rawData', controller.insertScanRawData);

module.exports = router;
