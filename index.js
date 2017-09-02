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
var day = new Date().getDay();
var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesay', 'Thursday', 'Friday', 'Saturday'];
var moreStuff = function() {
    function compare(a, b) {
        if (a.value < b.value)
            return 1;
        if (a.value > b.value)
            return -1;
        return 0;
    }
    console.log(counter[0]['date']);
    counter = counter[0]['front-end'].sort(compare);
    //console.log(counter.key + ',' + counter.value);
    console.log('Top 10 Skills on Indeed.com for', dayArr[day] + '\n');
    for (var i = 0; i < 50; i++) {
        console.log( (i + 1) + ') ' + counter[i].name, counter[i].value + ' mentions' + '\n');
    }
}
