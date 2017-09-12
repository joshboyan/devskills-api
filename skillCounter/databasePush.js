/**
 * This file connects to mongoDB and pushes the completed devskills object
 */
const config = require('../config');
const mongoose = require('mongoose');


const databasePush = devSkills => {
    'use strict';

    mongoose.connnect(config.dbURI, {
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
    const Skill = require('../server/models/skill');

    // Create a skill entry
    const skill = new Skill();
    skill.date = new Date();
    skill.skills = devSkills;

    // Add to database
    skill.save(function(err){
      if(err){
        res.send(err);
        throw err;
      } else {
        res.json({message:"Skill added!",
                  skill: skill});
      }
    });

    console.log('This got passed to database.js: ', devSkills.length);
    
}

module.exports = databasePush;