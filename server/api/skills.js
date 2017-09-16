const express = require('express');
const skillsRouter = express.Router();
const config = require('../../config');
const Count = require('../models/count');

// Get all the data
skillsRouter.get('/', (req, res) => {
    Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			res.json(counts);
		}
    });
});

// Get the latest data added
skillsRouter.get('/latest', (req, res) => {
    Count.findOne().sort({date: -1}).exec((err, count) => { 
        if(err) {
			console.log(err);
		} else {
			res.json(count);
		}
    });
});

// Get average of all data
skillsRouter.get('/average', (req, res) => {
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

			const total = counts[0].skills.map(skill => {
				return aggregateSkill(skill.name);
			});

			res.json(total);
		}
    });
}); 

// Get all the data about a certain skill
skillsRouter.get('/:skill', (req, res) => {
	Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			const requestedSkill = req.params.skill;
			// This apply call flattens the array of arrays
			const requested = [].concat.apply([], 
				// Look thorugh each count array
				counts.map(count =>{
					// Return the requested skill object from each array
					return count.skills.filter( skill => {
						return skill.name === requestedSkill;
					});
				})
			);
			res.send(requested);
		}
    });
});

// Get the latest data about a certain skill
skillsRouter.get('/:skill/latest', (req, res) => {
	Count.findOne().sort({date: -1}).exec((err, count) => { 
        if(err) {
			console.log(err);
		} else {
			const latestSkill = count.filter(skill => {
				return skill.name === req.params.skill;
			});
			res.json(latestSkill);
		}
    });
});

// Get average data for a certain skill
skillsRouter.get('/:skill/average', (req, res) => {
	Count.find({}, (err, counts) => {
		if(err) {
			console.log(err);
		} else {
			const requestedSkill = req.params.skill;
			// This apply call flattens the array of arrays
			const requested = [].concat.apply([], 
				// Look thorugh each count array
				counts.map(count =>{
					// Return the requested skill object from each array
					return count.skills.filter( skill => {
						return skill.name === requestedSkill;
					});
				})
			);
			let initialValue = {
				stackOverflow: 0,
				indeed: 0,
				twitter: 0
			}
			//Reduce all
			const aggregate = requested.reduce( (accumulator, currentValue) => {
				return {
					name: req.params.name,
					stackOverflow: accumulator.stackOverflow += currentValue.stackOverflow,
					indeed: accumulator.indeed += currentValue.indeed,
					twitter: accumulator.twitter += currentValue.twitter
				}
			}, initialValue);
		}
	});
});

module.exports = skillsRouter;