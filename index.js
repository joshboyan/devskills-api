var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/crawlerTest';
var counter;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");


    findDbCounter(db, function() {
        otherStuff();
        moreStuff();
        db.close();
    });
});

var findDbCounter = function(db, callback) {
    //Get collection
    var collection = db.collection('crawlerTest');
    // Find some documents
    collection.find().limit(1).sort({ $natural: -1 }).toArray(function(err, dbCounter) {
        assert.equal(err, null);
        counter = dbCounter;
        callback(dbCounter);
    });
}

var otherStuff = function() {
    //console.log(counter);
}
var moreStuff = function() {
    var frontEnd = counter[0]['front-end'];

    function sortObject(obj) {
        var arr = [];
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        arr.sort(function(a, b) {
            return a.value - b.value;
        });
        return arr;
    }
    var arr = sortObject(frontEnd);
    console.log(arr);
}
