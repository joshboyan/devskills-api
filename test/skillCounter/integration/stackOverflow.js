const { stackOverflow, formatResults } = require('../../../skillCounter/stackOverflow');
const expect = require('chai').expect;

describe('./test/skillCounter/integration/stackOverflow', function() {

	it('Returns an array of 100 skills', function(){
		this.timeout(10000);
		return stackOverflow
		.then(result => {
			expect(result).to.be.an('array');
			expect(result).to.have.lengthOf(100);
			expect(result[0]).to.have.keys('name', 'stackOverflow', 'twitter', 'indeed');
		});
	});

});
