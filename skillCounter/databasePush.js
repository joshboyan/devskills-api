/**
 * This file connects to mongoDB and pushes the completed devskills object
 */
const config = require('../config');
const mongooseConnect = require('../server/mongooseConnect');

const databasePush = devSkills => {
    'use strict';

    mongooseConnect();
    
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
        process.exit(0);
      }
    });    
}

module.exports = databasePush;