var express = require('express');
var router = express.Router();
var receipt = require('../api/receipt.js');
var log = require('log4js').getLogger("service");

router.get('/receipt', function(req, res) {
    var params = req.query;
    receipt.printReceipt(params, function(err, receipt) {
        if (err) {
            log.error(err);
            return res.send({error:"error in printing receipt, please contact delu if unexpected"});
        }
        return res.send(receipt.receipt);
    });
});

module.exports = router;
