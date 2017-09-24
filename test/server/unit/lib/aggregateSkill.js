const aggregateSkill = require('../../../../server/api/lib/aggregateSkill');
const expect = require('chai').expect;

describe('./test/server/unit/lib/aggregateSkills', function() {

	const skillName = 'javascript';

	const counts = [
		{
			skills : [
				{
					name: 'javascript',
					stackOverflow: 10,
					indeed: 10,
					twitter: 10
				},
				{
					name: 'java',
					stackOverflow: 10,
					indeed: 10,
					twitter: 10
				}
			]
		},
		{
			skills: [
				{
					name: 'script',
					stackOverflow: 10,
					indeed: 10,
					twitter: 10
				},
				{
					name: 'javascript',
					stackOverflow: 10,
					indeed: 10,
					twitter: 10
				}
			]
		}
	]

	it('Aggregates the info about the skill into a single object', function() {
		const result = aggregateSkill(skillName, counts);
		expect(result).to.be.an('object');
		expect(result).to.deep.equal({
					name: 'javascript',
					stackOverflow: 20,
					indeed: 20,
					twitter: 20
				})
	});
});
