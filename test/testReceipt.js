var assert = require('assert');
var receipt = require('../api/receipt.js');
describe('receipt',function(){
    describe('#processDiscountInfo()',function(){
        var amountDiscount = {
                    "name": "买二赠一",
                    "priority": "3",
                    "type":"amount-discount",
                    "basecount": 3,
                    "freecount": 1,
                    "items": [
                        "ITEM000001", "ITEM000002", "ITEM000003", "ITEM000004"
                    ]
        };
        var priceDiscount={
                "name": "95折",
                "priority": "1",
                "type":"price-discount",
                "rate": 0.95,
                "items": [
                    "ITEM000001", "ITEM000005", "ITEM000006"
                ]
        };


        it('should take the discount when amount-discount condition is met',function(){

            var itemInfo=[{
                "_id": "ITEM000001",
                "name": "羽毛球",
                "unit": "个",
                "price": 1,
                "count": 5,
                "totalPrice": 5
            }];
            var DiscountMap={
                "ITEM000001":[amountDiscount]
            };
            receipt.setDiscountMap(DiscountMap);
            var receiptObj = receipt.processDiscountInfo(itemInfo);
            assert.equal(4,itemInfo[0].totalPrice);
            assert.equal(4,receiptObj.total.price);
            assert.equal(1,receiptObj.total.cashSaved);
        });

        it('should take the discount with higher priority only',function(){
            var itemInfo=[{
                "_id": "ITEM000001",
                "name": "羽毛球",
                "unit": "个",
                "price": 1,
                "count": 5,
                "totalPrice": 5
            }];
            var DiscountMap={
                "ITEM000001":[amountDiscount,priceDiscount]
            };
            receipt.setDiscountMap(DiscountMap);
            var receiptObj = receipt.processDiscountInfo(itemInfo);
            assert.equal(4,itemInfo[0].totalPrice);
            assert.equal(4,receiptObj.total.price);
            assert.equal(1,receiptObj.total.cashSaved);
        });
    });
});