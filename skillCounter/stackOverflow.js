/**
 * This file gets the top 100 tags from stack overflow and
 * creates an object to pass down the promise chain to be
 * completed by the twitter.js and crawler.js.
 * https://www.npmjs.com/package/stackexchange
 */
const config = require('../config');
const stackexchange = require('stackexchange');
const email = require('./email');

//Create a promise to initialize the chain
const stackOverflow = new Promise((resolve, reject) => {
	'use strict';  
		
	const skillCounter = []; 
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
		if (err) {
		email('There was a problem accessing stackoverflow API', err);
		throw err;    
	}
	function formatResults(result) {
		let noDigits = result.name.replace(/[0-9]/g, "");
		let noDots = noDigits.replace(/\./g, "");
		let noDashes = noDots.replace(/\-/g, " ");
		return (noDashes !== 'json') ? noDashes.replace("js", "") : noDashes;
	}
		// Create an array of objects form the list of tags to
		// contain all the data aggregated
		results.items.map(result => {
		let formatedName = formatResults(result);
		let skill = {
			name : formatedName,
			stackOverflow : result.count,
			indeed : 0,
			twitter : 0
		};

		skillCounter.push(skill);
		})
		// console.log('Got the Skills: ', skillCounter);
		resolve(skillCounter);
	});
});

module.exports = stackOverflow;