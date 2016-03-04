CashRegister
=============

Simple implementation for Cash Register with Node.js, Express and MongoDB

Features
----------------------------

**Generate Receipt**

    /services/receipt?items=ITEM000001-3,ITEM000002,ITEM000003

Data Storage
----------------------------

**The storage layer is built upon MongoDB, and there're two collections.**

Inventory:

    {
		"_id": "ITEM000001",
		"name": "????",
		"unit": "?",
		"price": 3
	}
DiscountEvent:

	[
		{
			"_id": ObjectID("56d8201f271225b433008349"),
			"name": "????",
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
			"name": "95?",
			"priority": 1,
			"type": "price-discount",
			"rate": 0.95,
			"items": [
				"ITEM000001",
				"ITEM000005",
				"ITEM000006"
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

