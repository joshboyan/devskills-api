const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dataPush = devSkills => {
    console.log('This got passed to database.js: ', devSkills.length);
    // Use connect method to connect to the server
    MongoClient.connect(config.dbURI, (err, db) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertCounter(db, function() {

            db.close();
        });

    });
    const insertCounter = (db, callback) => {

        const collection = db.collection('crawlerTest');
        const formattedSkills = {
            date: new Date(),
            skills: devSkills
        };
        collection.insert(formattedSkills, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert(1, result.ops.length);
            callback(result);
        });
    }
}

module.exports = dataPush;