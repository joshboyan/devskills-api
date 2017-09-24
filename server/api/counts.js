const express = require('express');
const countsRouter = express.Router();
const Count = require('../models/count');
const aggregateSkill = require('./lib/aggregateSkill');
const averageSkill = require('./lib/averageSkill');

// Get all the data
countsRouter.get('/', (req, res) => {
    Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			const formatted = counts.map(count => {
				return count.skills;
			})
			res.json(formatted);
		}
    });
});

// Get the latest data added
countsRouter.get('/latest', (req, res) => {
    Count.findOne().sort({ date: -1 }).exec((err, count) => {
        if(err) {
			console.log(err);
		} else {
			res.json(count.skills);
		}
    });
});

// Get average of all data
countsRouter.get('/average', (req, res) => {
	Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			const totals = counts[0].skills.map(skill => {
				return aggregateSkill(skill.name, counts);
			});

			const average = totals.map(total => {
				return averageSkill(total, counts.length);
			});
			res.json(average);
		}
    });
});

module.exports = countsRouter;
