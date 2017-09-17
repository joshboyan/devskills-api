const express = require('express');
const countsRouter = express.Router();
const config = require('../../config');
const Count = require('../models/count');

// Get all the data
countsRouter.get('/', (req, res) => {
    Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			res.json(counts);
		}
    });
});

// Get the latest data added
countsRouter.get('/latest', (req, res) => {
    Count.findOne().sort({date: -1}).exec((err, count) => { 
        if(err) {
			console.log(err);
		} else {
			res.json(count);
		}
    });
});

// Get average of all data
countsRouter.get('/average', (req, res) => {
	Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			function aggregateSkill(skillName) {
				const requested = [].concat.apply([], counts.map(count =>{
					return count.skills.filter( skill => {
						return skill.name === skillName;
					});
				}));

				let initialValue = {
					name: skillName,
					stackOverflow: 0,
					indeed: 0,
					twitter: 0
				}
				const aggregate = requested.reduce( (accumulator, currentValue) => {
					return {
						name: skillName,
						stackOverflow: accumulator.stackOverflow += currentValue.stackOverflow,
						indeed: accumulator.indeed += currentValue.indeed,
						twitter: accumulator.twitter += currentValue.twitter
					}
				}, initialValue);
								
				return aggregate;
			}

			const totals = counts[0].skills.map(skill => {
				return aggregateSkill(skill.name);
			});
			
			const average = totals.map(skill => {
				return {
					name: skill.name,
					stackOverflow: skill.stackOverflow / counts.length,
					indeed: skill.indeed / counts.length,
					twitter: skill.twitter / counts.length
				}
			});
			res.json(average);
		}
    });
}); 

module.exports = countsRouter;