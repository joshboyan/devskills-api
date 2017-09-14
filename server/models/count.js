const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
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

const CountModel = mongoose.model('counts', CountSchema);

module.exports = SkillModel;