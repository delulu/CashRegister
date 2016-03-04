var config = require('../config/settings.js');
var log = require('log4js').getLogger("receipt");
var mongodb = require('./mongodb.js');
//var discountEvent = [
//    {
//        "name": "买二赠一",
//        "priority": "3",
//        "type":"amount-discount",
//        "rate": 0.33,
//        "items": [
//            "ITEM000001", "ITEM000002", "ITEM000003", "ITEM000004"
//        ]
//    },
//    {
//        "name": "95折",
//        "priority": "1",
//        "type":"price-discount",
//        "rate": 0.05,
//        "items": [
//            "ITEM000001", "ITEM000005", "ITEM000006"
//        ]
//    }
//];
var discountEvent;

function initDiscountEvent(callback) {
    mongodb.getDiscountEvent({}, function(err, results) {
        if (err) {
            log.error("initDiscountEvent error:" );
            log.error(err);
            return callback(err);
        }

        log.debug("getting discountEvent from mongodb as below");
        log.debug(results);
        discountEvent = results;
        return callback(null);
    });
}

function printReceipt(params,callback) {
    var receiptBuffer = "***没钱赚商店购物清单***<br> " +
        "名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6:00(元)<br>" +
        "------------------------------<br>" +
        "买二赠一商品：<br>" +
        "";
    callback(null, {receipt:receiptBuffer});
}

exports.initDiscountEvent = initDiscountEvent;
exports.printReceipt = printReceipt;