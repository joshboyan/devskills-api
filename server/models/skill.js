var mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  stackOverflow : {
    type: Number, 
    required: true
  },
  indeed : {
    type: Number, 
    required: true
  },
  twitter : {
    type: Number, 
    required: true
  }
});

const SkillModel = mongoose.model('skills', SkillSchema);

module.exports = SkillSchema;
