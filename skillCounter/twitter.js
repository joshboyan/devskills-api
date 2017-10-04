/**
 * This promise reiceve the object fomr stackoverflow.js and
 * add the data collected from the Twitter streaming API.
 * https://www.npmjs.com/package/hashtag-count
 */
const config = require('../config');
const HashtagCount = require('hashtag-count');
const email = require('./email');

const addTwitterResults = function(skillCounter, results) {

	// Get the first key in the results object
	let innerResults;
	for(const key in results) {
		innerResults = results[key];
		break;
	}

	// Add the Twitter results to the skillCounter array
	const updatedSkills = skillCounter.map(skill => {
		skill.twitter = innerResults[skill.name];
		return skill;
	});
	return updatedSkills;
}

// Wrap the promise is a function so we can pass arguments to it
const twitter = (skillCounter, timer) => {
	'use strict';

	return new Promise(resolve => {


		const hc = new HashtagCount({
		'consumer_key': config.consumer_key,
		'consumer_secret': config.consumer_secret,
		'access_token': config.access_token,
		'access_token_secret': config.access_token_secret
		});

		// Create array of hashtags to tally from skillCounter object
		const hashtags = skillCounter.map(skill => {
		return skill.name;
		});

		// Hashtag tallies for each time interval will be added to the results object.
		const interval = timer;

		// Stop running after this amount of time has passed.
		const limit = timer;

		// Called after time limit has been reached.
		const finishedCb = (err, results) => {
		if(err) {
			email('There was a problem listening to the twitter streaming API', err);
			console.error(err);
		}

		// Move on in promise
		resolve(addTwitterResults(skillCounter, results));
		};

		// Open a connection to Twitter's Streaming API and start capturing tweets!
		hc.start({
		hashtags: hashtags,       // required
		interval: interval,       // required
		limit: limit,             // optional
		finishedCb: finishedCb,   // optional
		});
	});
}

module.exports = { addTwitterResults, twitter };
