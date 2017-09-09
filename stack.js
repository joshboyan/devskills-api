var stackexchange = require("stackexchange")

var stackOverflow = new Promise(function(resolve, reject) {
  var options = { version: 2.2 };
  var context = new stackexchange(options);

  var filter = {
    key: '7AJnIg5kOBEHVkZ8wKdyMw((',
    site: 'stackoverflow',
    pagesize: 100,
    sort: 'popular', //activity
    order: 'desc'
  };

  // Get all the questions (http://api.stackexchange.com/docs/questions)
  context.tags.tags(filter, function(err, results){
    if (err) throw err;
    var skillCounter = [];
    
    /*average : function() {
        return (this.stackOverflow + this.indeed + this.twitter) / 3;
      }*/
    results.items.map(function(result){
      var skill = {
      name : result.name,
      stackOverflow : result.count,
      indeed : 0,
      twitter : 0
      };

      skillCounter.push(skill);
    })
    //console.log(skillCounter);
    //console.log(results.items);
    //console.log(results.has_more);
    resolve(skillCounter);
  });
});
module.exports = stackOverflow;