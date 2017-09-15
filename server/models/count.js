const mongoose = require('mongoose');
const Skill = require('./skill');

const CountSchema = new mongoose.Schema({
	date: { 
		type: Date, 
		default: Date.now,
		required: true,
		unique: true 
	},
	skills: {
		type: [Skill],
		required: true
	}
});

const CountModel = mongoose.model('counts', CountSchema);

module.exports = CountModel;