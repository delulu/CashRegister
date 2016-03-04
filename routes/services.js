var express = require('express');
var router = express.Router();
var receipt = require('../api/receipt.js');
var log = require('log4js').getLogger("service");

receipt.initDiscountMap();

router.get('/receipt', function(req, res) {
    var params = req.query;
    var items = params.items;
    if (!items) {
        res.send({ error: "error in printing receipt, param missing." });
    }
    items = items.split(",");
    receipt.generateReceipt(items, function(err, result) {
        if (err) {
            log.error(err);
            return res.send({error:"error in printing receipt, "+err.error});
        }
        return res.send(result);
    });
});

module.exports = router;
