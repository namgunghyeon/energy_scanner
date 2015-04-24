'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/signin', controller.signin);
router.post('/signup', controller.signup);

module.exports = router;
