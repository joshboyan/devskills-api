const { twitter } = require('../../../skillCounter/twitter');
const expect = require('chai').expect;

describe('./test/skillCounter/integration/twitter.js', function() {
	const skillCounter = [
		{
			name: 'giveaway',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
		{
			name: 'win',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
		{
			name: 'nowplaying',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
	];
	const timer = '30 seconds';

	it('Returns an array of objects with the twitter key updated for each object', function() {
		this.timeout(35000);
		return twitter(skillCounter, timer)
		.then(function(results) {
			expect(results).to.be.an('array');
			expect(results).to.have.lengthOf(3);
			results.forEach(function(result){
				expect(result.twitter).not.equal(0);
			});
		});
	});

});
