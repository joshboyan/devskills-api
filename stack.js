var stackexchange = require("stackexchange")

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
  var skill = {
    average : function() {
      return (this.stackOverflow + this.indeed + this.twitter) / 3;
    }
  };
  results.items.map(function(result){
    skill.name = result.name;
    skill.stackOverflow = result.count;
    skill.indeed = 0;
    skill.twitter = 0;

    skillCounter.push(skill);
  })
  console.log(skillCounter);
  //console.log(results.items);
  console.log(results.has_more);
});