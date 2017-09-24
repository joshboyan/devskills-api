const { formatResults, createObject } = require('../../../skillCounter/stackOverflow');
const expect = require('chai').expect;

describe('./test/skillCounter/unit/stackOverflow', function() {

	context('formatResults()', function() {

		it('Properly formats skill names', function() {
			const result = formatResults('python-2.0');
			expect(result).to.have.string('python');
		});

	});

	context('createObject()', function() {

		const input = [
				{
					'name': 'java',
					'notNeeded': 'stuff'
				},
				{
					'name': 'javascript',
					'notThis': 'stuff'
				},
				{
					'name': 'python',
					'nope': 'stuff'
				}
			];

		it('Create an array with an object for each tag', function() {
			const result = createObject(input);
			expect(result).to.be.an('array');
			expect(result[0]).to.be.an('object');
			expect(result[0]).to.have.keys('name', 'stackOverflow', 'twitter', 'indeed');
		});

	});

});
