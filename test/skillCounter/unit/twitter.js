const { addTwitterResults } = require('../../../skillCounter/twitter');
const expect = require('chai').expect;

describe('./test/skillCounter/unit/twitter.js', function() {
	const skillCounter = [
		{
			name: 'javascript',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
		{
			name: 'react',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
		{
			name: 'angular',
			stackOverflow: 100,
			twitter: 0,
			indeed: 0
		},
	];
	const results = {
		'first': {
			'javascript': 10,
			'react': 10,
			'angular': 10
		}
	};

	context('addTwitterResults()', function() {

		it('Returns an array of objects with the twitter key updated for each object', function() {
			this.timeout(60000);
			const testResults = addTwitterResults(skillCounter, results);
			expect(testResults).to.be.an('array');
			expect(testResults).to.have.lengthOf(3);
			testResults.forEach(function(result){
				expect(result.twitter).not.equal(0);
				expect(result.twitter).to.equal(10);
			});
		});

	});

});
