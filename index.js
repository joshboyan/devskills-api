var stackOverflow = require('./stack');
var twitter = require('./twitter');



stackOverflow.then(function(skillCounter){
  console.log(skillCounter);
}).catch(function(err){
  console.log(err);
})

