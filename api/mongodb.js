
var log = require('log4js').getLogger("mongodb");
var config = require('../config/settings.js');

var MongoClient = require('mongodb').MongoClient;

var connection = config.mongodb.connection;

var discountEvent, inventory;

function initConnections(callback) {
    log.info(connection);
    MongoClient.connect(connection, function (err, database) {
        if (err) {
            log.error('mongodb connection execution Error', err.message);
            
            return callback(err);
        }
        discountEvent = database.collection(config.mongodb.discountEvent);
        inventory = database.collection(config.mongodb.inventory);
        log.info("MongoDB connected");
        return callback(null);
    });
}

function getDiscountEvent(params,callback) {
    discountEvent.find(params, {}).toArray(function (err, results) {
        if (err) {
            return callback(err);
        }
        
        log.info("getDiscountEvent: the length of results is " + results.length);
        
        return callback(null, results);
    });
}

function updateDiscountEvent(filter, updates , callback) {
    discountEvent.update(filter, updates, { upsert: true }, function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
}

function getInventory(params, callback) {
    log.info(params);
    inventory.find(params, {}).toArray(function (err, results) {
        if (err) {
            return callback(err);
        }
        
        log.info("getInventory: the length of results is " + results.length);
        
        return callback(null, results);
    });
}

exports.initConnections = initConnections;
exports.getDiscountEvent = getDiscountEvent;
exports.updateDiscountEvent = updateDiscountEvent;
exports.getInventory = getInventory;

