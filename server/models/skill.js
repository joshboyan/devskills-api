var mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  stackOverflow : {
    type: number, 
    required: true
  },
  indeed : {
    type: number, 
    required: true
  },
  twitter : {
    type: number, 
    required: true
  }
});

const SkillModel = mongoose.model('skills', SkillSchema);
