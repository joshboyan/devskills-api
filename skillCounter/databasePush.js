/**
 * This file connects to mongoDB and pushes the completed devskills object
 */
const config = require('../config');
const mongoose = require('mongoose');


const databasePush = devSkills => {
    'use strict';

    mongoose.connect(config.dbURI, {
        useMongoClient: true
    });

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + config.dbURI);
    }); 

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {  
        console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    }); 
    
    // Import model
    const Count = require('../server/models/count');

    // Create a count entry
    const count = new Count();
    count.date = new Date();
    count.skills = devSkills;

    // Add to database
    count.save(function(err){
      if(err){
        console.error(err);
        throw err;
      } else {
        console.log("Skill count added!", count);
      }
    });    
}

module.exports = databasePush;