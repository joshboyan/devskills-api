const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
	date: { 
		type: Date, 
		default: Date.now,
		required: true,
		unique: true 
	},
	skills: {
		type: [],
		required: true
	}
});

const SkillModel = mongoose.model('skills', SkillSchema);

module.exports = SkillModel;