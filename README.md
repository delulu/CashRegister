CashRegister
=============

Simple implementation for Cash Register with Node.js, Express and MongoDB

Print Receipt
----------------------------

**Input**

    /services/receipt?items=ITEM000001-3,ITEM000002,ITEM000003,ITEM000004

Output in log file:
	
    [2016-03-06 19:28:24.319] [INFO] receipt - ***没钱赚商店购物清单***
    [2016-03-06 19:28:24.319] [INFO] receipt - 名称: 可口可乐, 数量: 3瓶, 单价: 3.00(元), 小计: 6.00(元)
    [2016-03-06 19:28:24.320] [INFO] receipt - 名称: 羽毛球, 数量: 1个, 单价: 1.00(元), 小计: 0.95(元), 节省： 0.05(元)
    [2016-03-06 19:28:24.320] [INFO] receipt - 名称: 苹果, 数量: 1斤, 单价: 5.50(元), 小计: 5.50(元)
    [2016-03-06 19:28:24.321] [INFO] receipt - 名称: 草莓, 数量: 1斤, 单价: 15.00(元), 小计: 15.00(元)
    [2016-03-06 19:28:24.323] [INFO] receipt - -----------------------
    [2016-03-06 19:28:24.323] [INFO] receipt - 买二赠一商品:
    [2016-03-06 19:28:24.324] [INFO] receipt - 名称: 可口可乐, 数量: 1瓶
    [2016-03-06 19:28:24.324] [INFO] receipt - -----------------------
    [2016-03-06 19:28:24.324] [INFO] receipt - 总计: 27.45(元)
    [2016-03-06 19:28:24.325] [INFO] receipt - 节省: 3.05(元)
    [2016-03-06 19:28:24.326] [INFO] receipt - ***********************

Data Storage
----------------------------

**The storage layer is built upon MongoDB, and there're two collections.**

Inventory:

    [
		{
			"_id": "ITEM000001",
			"name": "可口可乐",
			"unit": "瓶",
			"price": 3
		},
		{
			"_id": "ITEM000002",
			"name": "羽毛球",
			"unit": "个",
			"price": 1
		},
		{
			"_id": "ITEM000003",
			"name": "苹果",
			"unit": "斤",
			"price": 5.5
		},
		{
    		"_id": "ITEM000004",
    		"name": "草莓",
    		"unit": "斤",
    		"price": 15
		}
	]

DiscountEvent:

	[
		{
			"_id": ObjectID("56d8201f271225b433008349"),
			"name": "买二赠一",
			"priority": 3,
			"type": "amount-discount",
			"basecount": 3,
			"freecount": 1,
			"items": [
				"ITEM000001",
				"ITEM000002",
				"ITEM000003"
			]
		},
		{
			"_id": ObjectID("56d82056271225b43300834a"),
			"name": "95折",
			"priority": 1,
			"type": "price-discount",
			"rate": 0.95,
			"items": [
				"ITEM000001",
				"ITEM000002"
			]
		}
	]

Quick Start
----------------------------

**To install dependency packages**

    cd YOUR_PATH/CashRegister && npm install

**To configure mongodb server**

`cd YOUR_PATH/CashRegister/config/settings` then update the connection string.

**To run**

    cd YOUR_PATH/CashRegister && node bin/www

