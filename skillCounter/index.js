'use strict';
const { stackOverflow } = require('./stackOverflow');
const twitter = require('./twitter');
const crawler = require('./crawler');
const databasePush = require('./databasePush');
const email = require('./email');

// Create a counter object and get top 100 tags and counts from stackoverflow
stackOverflow.then(skillCounter => {
	// Listen to twitter 10 min to see how many times each term is hashtagged
	return twitter(skillCounter);
}).then(twitterSkills => {
	// Scrape first 300 job entries on indeed to see how many mentions for each
	return crawler(twitterSkills);
}).then(devSkills => {
	// Push total counts to mongoDB
	databasePush(devSkills);
}).catch(err => {
	console.error(err);
	email('There was an error in the promise chain', err);
});

