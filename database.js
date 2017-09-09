var config = require('./config');
var counter = require('./counter');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dataPush = function() {

    // Use connect method to connect to the server
    MongoClient.connect(config.dbURI, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertCounter(db, function() {

            db.close();
        });

    });
    var insertCounter = function(db, callback) {

        var collection = db.collection('crawlerTest');

        collection.insert(counter, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert(1, result.ops.length);
            callback(result);
        });
    }
}

module.exports = dataPush;