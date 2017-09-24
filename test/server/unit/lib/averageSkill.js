const averageSkill = require('../../../../server/api/lib/averageSkill');
const expect = require('chai').expect;

describe('./test/server/unit/lib/averageSkill', function() {

	const total = {
		name: 'test',
		stackOverflow: 22,
		twitter: 22,
		indeed: 22
	};

	const length = 2;

	it('Returns the mean average for 3 keys in the input object', function() {
		const result = averageSkill(total, length);
		expect(result).to.be.an('object');
		expect(result).to.have.deep.equal({
			name: 'test',
			stackOverflow: 11,
			twitter: 11,
			indeed: 11
		});
	});
});
