var express = require('express');
var router = express.Router();
var debug = require('debug')('index');
var config = require('../config/settings.js');
var request = require('request');

var log = require('log4js').getLogger("index");

/* GET home page. */
router.get('/', function(req, res) {

    log.info("*********************");
    log.info("start rendering index");
    log.info("*********************");



    log.info(global.env);

    res.render('index');
});

module.exports = router;
