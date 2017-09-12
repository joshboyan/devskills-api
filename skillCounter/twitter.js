/**
 * This promise reiceve the object fomr stackoverflow.js and
 * add the data collected from the Twitter streaming API.
 * https://www.npmjs.com/package/hashtag-count
 */
const config = require('./config');
const HashtagCount = require('hashtag-count');
const email = require('./email');

// Wrap the promise is a function so we can pass arguments to it
const twitter = skillCounter => { 
	'use strict';

	return new Promise((resolve, reject) => {

		let updatedSkills;
		const hc = new HashtagCount({
		'consumer_key': config.consumer_key,
		'consumer_secret': config.consumer_secret,
		'access_token': config.access_token,
		'access_token_secret': config.access_token_secret
		});

		// Create rray of hashtags to tally from skillCounter object
		const hashtags = skillCounter.map(skill => {
		return skill.name;
		});
		
		// Hashtag tallies for each time interval will be added to the results object. 
		const interval = '30 minutes';

		// Stop running after this amount of time has passed. 
		const limit = '30 minutes';
		
		// Called after time limit has been reached. 
		const finishedCb = (err, results) => {
		if (err) {
			email('There was a problem listening to the twitter streaming API', err);
			throw err;      
		}
			// Get the first key in the results object
			let innerResults;
			for (let key in results) {
				innerResults = results[key];
				break;
			}
			
			// Add the Twitter relusts to the skillCounter array
			updatedSkills = skillCounter.map(skill => {
			skill.twitter = innerResults[skill.name];
			return skill;
			});
		console.log('Add in twitter skills', updatedSkills);
		// Move on in promise
		resolve(updatedSkills);
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

module.exports = twitter;