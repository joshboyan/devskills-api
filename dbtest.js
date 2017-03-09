var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var counter = {
    'front-end': {
      'accessibility': 0,
      'agile': 0,
      'ajax': 0,
      'apache': 0,
      'api': 0,
      'angular': 0,
      'aws': 0,
      'backbone': 0,
      'bem': 0,
      'bootstrap': 0,
      'browserify': 0,
      'cassandra': 0,
      'chai': 0,
      'codeignitor': 0,
      'command line': 0,
      'css': 0,
      'django': 0,
      'docker': 0,
      'ember': 0,
      'foundation': 0,
      'git': 0,
      'github': 0,
      'grunt': 0,
      'gulp': 0,
      'hbase': 0,
      'html': 0,
      'jasmine': 0,
      'javascript': 0,
      'jekyll': 0,
      'jenkins': 0,
      'jest': 0,
      'jira': 0,
      'jquery': 0,
      'json': 0,
      'karma': 0,
      'kohana': 0,
      'less': 0,
      'linux': 0,
      'marionette': 0,
      'mobile': 0,
      'mocha': 0,
      'mongo': 0,
      'mvc': 0,
      'nginx': 0,
      'node': 0,
      'nosql': 0,
      'npm': 0,
      'oocss': 0,
      'open source': 0,
      'photoshop': 0,
      'php': 0,
      'perl': 0,
      'postcss': 0,
      'protractor': 0,
      'puppet': 0,
      'python': 0,
      'rails':0,
      'react': 0,
      'redux': 0,
      'restful': 0,
      'ruby': 0,
      'sass': 0,
      'saas': 0,
      'sinon': 0,
      'symfony': 0,
      'sql': 0,
      'tomcat': 0,
      'ux': 0,
      'vagrant': 0,
      'vue': 0,
      'webpack': 0,
      'wireframes': 0,
      'wordpress': 0,
      'zend': 0  
    }
}

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
}