const express = require('express');
const skillRouter = express.Router();
const Count = require('../models/count');

// Get all the data about a certain skill
skillRouter.get('/:skill', (req, res) => {
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
skillRouter.get('/:skill/latest', (req, res) => {
	Count.findOne().sort({ date: -1 }).exec((err, count) => {
        if(err) {
			console.log(err);
		} else {
			const latestSkill = count.skills.filter(skill => {
				return skill.name === req.params.skill;
			});
			res.json(latestSkill);
		}
    });
});

// Get average data for a certain skill
skillRouter.get('/:skill/average', (req, res) => {
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
			const initialValue = {
				stackOverflow: 0,
				indeed: 0,
				twitter: 0
			}
			//Reduce all
			const aggregate = requested.reduce( (accumulator, currentValue) => {
				return {
					name: req.params.skill,
					stackOverflow: accumulator.stackOverflow += currentValue.stackOverflow,
					indeed: accumulator.indeed += currentValue.indeed,
					twitter: accumulator.twitter += currentValue.twitter
				}
			}, initialValue);

			const average =  {
					name: aggregate.name,
					stackOverflow: aggregate.stackOverflow / counts.length,
					indeed: aggregate.indeed / counts.length,
					twitter: aggregate.twitter / counts.length
				}

			res.json([average]);
		}
	});
});

module.exports = skillRouter;
