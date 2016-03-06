var config = require('../config/settings.js');
var log = require('log4js').getLogger("receipt");
var mongodb = require('./mongodb.js');
//var discountEvent = [
//    {
//        "name": "买二赠一",
//        "priority": "3",
//        "type":"amount-discount",
//        "basecount": 3,
//        "freecount": 1,
//        "items": [
//            "ITEM000001", "ITEM000002", "ITEM000003", "ITEM000004"
//        ]
//    },
//    {
//        "name": "95折",
//        "priority": "1",
//        "type":"price-discount",
//        "rate": 0.95,
//        "items": [
//            "ITEM000001", "ITEM000005", "ITEM000006"
//        ]
//    }
//];
var DiscountMap= {};

function initDiscountMap() {
    mongodb.getDiscountEvent({}, function(err, results) {
        if (err) {
            log.error("initDiscountEvent error:" );
            log.error(err);
        }
        //order discount info by priority, the higher priority will be choosed first
        results.sort(function (a, b) {
            return b.priority - a.priority;
        });

        log.debug("getting discountEvent from mongodb as below");
        log.debug(results);
        //build DiscountMap indexed by itemId
        results.forEach(function(record) {
            var items = record.items;
            items.forEach(function(itemId) {
                if (!DiscountMap[itemId]) {
                    DiscountMap[itemId] = [];
                }
                DiscountMap[itemId].push(record);
            });
        });
    });
}

function processAmountDiscount(item, discount, receipt) {
    if (item.count < discount.basecount) {
        return false;
    }
    var discountName = discount.name;
    //for amount-discount type, the items for free should be listed in the final receipt
    if (!receipt[discountName]) {
        receipt[discountName] = [];
    }
    receipt[discountName].push(item);

    item.freecount = Math.round(item.count * discount.freecount / discount.basecount);
    var cashSaved = item.freecount * item.price;
    item.totalPrice -= cashSaved;
    
    //update total cashSaved info
    receipt.total.cashSaved += cashSaved;

    return true;
}

function processPriceDiscount(item, discount, receipt) {
    var cashSaved = Math.round(item.totalPrice * (1 - discount.rate)*100)/100;
    item.totalPrice -= cashSaved;
    item.cashSaved = cashSaved;
    
    //update total cashSaved info
    receipt.total.cashSaved += cashSaved;

    return true;
}

function processDiscountInfo(itemInfo) {
    var receipt = {
        itemList: itemInfo,
        total: {
            price: 0,
            cashSaved: 0
        }
    };
    //traverse itemInfo and DiscountMap to update discount info in each item
    itemInfo.forEach(function (item) {
        var itemId = item._id;
        if (DiscountMap[itemId]) {
            var discountArray = DiscountMap[itemId];
            for (var i = 0; i < discountArray.length; i++) {
                var discount = discountArray[i];
                //skip the rest when high priority discount condition is met
                if (discount.type === "amount-discount" && processAmountDiscount(item, discount, receipt)) {
                    break;
                }
                if (discount.type === "price-discount" && processPriceDiscount(item, discount, receipt)) {
                    break;
                }
            }

        }
        
        //update total price info no matter item is discounted or not
        receipt.total.price += item.totalPrice;
    });
    return receipt;
}

function initItemInfo(items,callback) {
    var itemArray = [], itemMap = {}, itemIds = [];
    //aggregate input items, use itemArray to track the order of input items
    items.forEach(function (item) {
        var itemSplits = item.split('-');
        var itemId = itemSplits[0];
        var itemCount = 1;
        if (itemSplits.length === 2) {
            itemCount = itemSplits[1];
        }
        if (itemMap[itemId]) {
            itemMap[itemId].count += itemCount;
        } else {
            var record = {
                count: itemCount
            };
            itemArray.push(record);
            itemIds.push(itemId);
            itemMap[itemId] = record;
        }
    });
    
    //fetch iteminfo from mongodb by itemIds
    mongodb.getInventory({
        _id: {
            $in: itemIds
        }
    }, function(err, itemInfo) {
        if (err) {
            log.error("initItemInfo error:");
            log.error(err);
            return callback(err);
        }
        log.debug("getting itemInfo from mongodb as below");
        log.debug(itemInfo);

        //copy iteminfo into itemArray
        itemInfo.forEach(function (record) {
            var id = record._id;
            if (itemMap[id]) {
                for (var key in record) {
                    itemMap[id][key] = record[key];
                }
                itemMap[id].totalPrice = record.price * itemMap[id].count;
            }
        });
        delete itemInfo;
        return callback(null, itemArray);
    });
}

function printReceipt(receipt) {
    //var receiptBuffer = "***没钱赚商店购物清单***<br> " +
    //    "名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6:00(元)<br>" +
    //    "------------------------------<br>" +
    //    "买二赠一商品：<br>" +
    //    "";
    var title = "***没钱赚商店购物清单***";
    var sLine = "-----------------------";
    var eLine = "***********************";
    log.info(title);
    var itemList = receipt.itemList;
    itemList.forEach(function (item) {
        if (item.cashSaved) {
            log.info("名称: %s, 数量: %d%s, 单价: %s(元), 小计: %s(元), 节省： %s(元)", item.name, item.count, item.unit, (item.price).toFixed(2), (item.totalPrice).toFixed(2), (item.cashSaved).toFixed(2));
        } else {
            log.info("名称: %s, 数量: %d%s, 单价: %s(元), 小计: %s(元)", item.name, item.count, item.unit, parseFloat(item.price).toFixed(2), parseFloat(item.totalPrice).toFixed(2));
        }
    });
    for (var key in receipt) {
        if (key !== "itemList" && key !== "total") {
            log.info(sLine);
            log.info("%s商品:", key);
            receipt[key].forEach(function(freeItem) {
                log.info("名称: %s, 数量: %d%s", freeItem.name, freeItem.freecount, freeItem.unit);
            });
        }
    }
    var total = receipt.total;
    log.info(sLine);
    log.info("总计: %s(元)", (total.price).toFixed(2));
    log.info("节省: %s(元)", (total.cashSaved).toFixed(2));
    log.info(eLine);
}

function generateReceipt(items,callback) {
    initItemInfo(items, function (err, itemArray) {
        if (err) {
            return callback(err);
        }
        var receipt = processDiscountInfo(itemArray);
        printReceipt(receipt);
        return callback(null, {"success":"receipt has been printed in log"});
    });
    
}


exports.initDiscountMap = initDiscountMap;
exports.generateReceipt = generateReceipt;