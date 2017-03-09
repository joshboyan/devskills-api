var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var counter = {
    'front-end': [

        { key: 'react', value: 0 },
        { key: 'redux', value: 0 },
        { key: 'restful', value: 0 },
        { key: 'ruby', value: 0 },
        { key: 'sass', value: 0 },

    ]
}
var word = 'react';
counter['front-end'].forEach(skill => {
    	console.log(skill.key);
        if (word === skill.key) {
            skill.value += 1;
           
        }
    
});
counter['front-end'].value += 1;
console.log(counter);
/*
// Connection URL
var url = 'mongodb://localhost:27017/crawlerTest';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db, function() {  
    	findDocuments(db, function() {
      db.close();
    });
    });
});

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insert(
		counter, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			assert(1, result.ops.length);
			console.log('Inserted 3 documents into the collection');
			callback(result);
		});
}

var findDocuments = function(db, callback) {
	//Get collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find().toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Found the following records');
		console.log(docs);
		callback(docs);
	});
}
var updateDocuments = function(db, callback) {
	var collection = db.collection('documents');
	collection.updateOne({a:2}, 
		{$set: { b : 1}}, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log('Updated the document with the field a equal to 2');
			callback(result);
		});
}*/
