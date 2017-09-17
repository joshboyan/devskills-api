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

CountSchema.pre('validate', (next) => {

next();
});

CountSchema.post('save', (next)=> {
	const count = this;
	console.log("Count added", count);
	next();
});

const CountModel = mongoose.model('counts', CountSchema);

module.exports = CountModel;