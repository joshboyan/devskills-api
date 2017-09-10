var stackOverflow = require('./stackOverflow');
var twitter = require('./twitter');

stackOverflow.then(function(skillCounter){
  return twitter(skillCounter);  
}).then(function(updatedSkills){
  console.log(updatedSkills);
}).catch(function(err){
  console.error(err);
})

