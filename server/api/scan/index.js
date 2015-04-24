'use strict';

var express = require('express');
var controller = require('./scan.controller');

var router = express.Router();

router.get('/:email/history', controller.selectScanHistory);
router.post('/:email/history', controller.insertScanHistory);

module.exports = router;
