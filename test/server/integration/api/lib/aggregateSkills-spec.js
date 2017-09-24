const aggregateSkill = require('../../../api/lib/aggregateSkill');
const expect = require('chai').expect;

describe('./server/api/lib/aggregateSkills function', function(){
	const skillName = 'javascript';
	const counts = [
    {
        "_id": "59bc3cdd8474a60b1cf5ac0e",
        "__v": 0,
        "skills": [
            {
                "name": "javascript",
                "stackOverflow": 100,
                "indeed": 33,
                "twitter": 18,
                "_id": "59bc3cdd8474a60b1cf5ac72"
            },
            {
                "name": "java",
                "stackOverflow": 1312646,
                "indeed": 552,
                "twitter": 62,
                "_id": "59bc3cdd8474a60b1cf5ac71"
            },
            {
                "name": "c#",
                "stackOverflow": 1136582,
                "indeed": 72,
                "twitter": 0,
                "_id": "59bc3cdd8474a60b1cf5ac70"
            }
        ]
    },
    {
        "_id": "59bc3cdd8474a60b1cf5ac0e",
        "__v": 0,
        "skills": [
            {
                "name": "javascript",
                "stackOverflow": 100,
                "indeed": 33,
                "twitter": 80,
                "_id": "59bc3cdd8474a60b1cf5ac72"
            },
            {
                "name": "java",
                "stackOverflow": 1312646,
                "indeed": 552,
                "twitter": 62,
                "_id": "59bc3cdd8474a60b1cf5ac71"
            },
            {
                "name": "c#",
                "stackOverflow": 1136582,
                "indeed": 72,
                "twitter": 0,
                "_id": "59bc3cdd8474a60b1cf5ac70"
            }
        ]
    }
]

	it('Returns an object', function(){
		const result = aggregateSkill(skillName, counts);
		expect(result).to.be.an('object');
	});

	it('Returns an undefined without a valid skillName argument', function(){
		const result = aggregateSkill('error', counts);
		expect(result).to.be.an('object');
	});

	it('Returns the skills counted correctly in the object', function(){
		const result = aggregateSkill(skillName, counts);
		expect(result).to.deep.equal({
								"name": "javascript",
                "stackOverflow": 200,
                "indeed": 66,
                "twitter": 98})
	});
});
