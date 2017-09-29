"use strict";
/**
 * This file gets the top 100 tags from stack overflow and
 * creates an object to pass down the promise chain to be
 * completed by the twitter.js and crawler.js.
 * https://www.npmjs.com/package/stackexchange
 */
const config = require('../config');
const stackexchange = require('stackexchange');
const email = require('./email');

// Format the tags in the way they will appear in other resources
const formatResults = function(result) {
	const noDigits = result.replace(/[0-9]/g, "");
	const noDashes = noDigits.replace(/-/g, " ");
	const noDots = (noDashes !== 'asp.net') ? noDigits.replace(/\./g, " ") : noDashes;
	return (noDots !== 'json') ? noDots.replace("js", "") : noDots;
}

// Create an array with an object for each tag to hold counts
const createObject = function(results) {
	const skillCounter = [];
	results.map(result => {
		const formatedName = formatResults(result.name);
		const skill = {
			name : formatedName,
			stackOverflow : result.count,
			indeed : 0,
			twitter : 0
		};
		skillCounter.push(skill);
	});
	return skillCounter;
}

//Create a promise to initialize the chain
const stackOverflow = new Promise(resolve => {
	'use strict';

	const options = { version: 2.2 };
	const context = new stackexchange(options);
	const filter = {
		key: config.key,
		site: 'stackoverflow',
		pagesize: 100,
		sort: 'popular', //activity
		order: 'desc'
	};

	// Get the top 100 tags
	context.tags.tags(filter, (err, results) => {
		if(err) {
			email('There was a problem accessing stackoverflow API', err);
			throw err;
		}

		// Create an array of objects from the list of tags to
		// contain all the data aggregated and resolve promise
		resolve(createObject(results.items));
	});
});

module.exports = { formatResults, createObject, stackOverflow };
