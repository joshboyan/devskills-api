var config = require('./config');
var HashtagCount = require('hashtag-count');

var twitter = function(skillCounter) { 
  console.log(skillCounter);
  return;
  var hc = new HashtagCount({
    'consumer_key': config.consumer_key,
    'consumer_secret': config.consumer_secret,
    'access_token': config.access_token,
    'access_token_secret': config.access_token_secret
  });

  // Array of hashtags to tally. Do not include # prefix. 
  var hashtags = ['javascript', 'python', 'reactjs', 'git'];
  
  // Hashtag tallies for each time interval will be added to the results object. 
  var interval = '1 minute';

  // Stop running after this amount of time has passed. 
  var limit = '1 minute';
  
  // Called after time limit has been reached. 
  var finishedCb = function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
      var updatedSkills = skills.forEach(function(skill){
        skill.twitter = results.skill;
      });
      console.log(updatedSkills);
    }
  };
  
  // Open a connection to Twitter's Streaming API and start capturing tweets! 
  hc.start({
    hashtags: hashtags,       // required 
    interval: interval,       // required 
    limit: limit,             // optional 
    finishedCb: finishedCb,   // optional 
  });
}

module.exports = twitter;