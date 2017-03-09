var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/crawlerTest';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");


    findDbCounter(db, function() {
        db.close();
    });

});

var findDbCounter = function(db, callback) {
    //Get collection
    var collection = db.collection('crawlerTest');
    // Find some documents
    collection.find().limit(1).sort({$natural:-1}).toArray(function(err, dbCounter) {
        assert.equal(err, null);
        console.log(dbCounter);
        callback(dbCounter);
    });
}
