/**
 * Integration tests for counts router
 */
var app = require('../../index.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('/api/skills route', function() {
	it('should GET all the skill counts', function(done) {
		request(app)
		.get('/api/skills')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end( function(err, resp) {
			expect(resp.body).to.be.an('array');
			done();
		});
	});
});

describe('/api/skills/latest', function() {
	it('should GET the latest skill counts', function(done) {
		request(app)
			.get('/api/skills/latest')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array');
				done();
			});
	});
});

describe('/api/skills/average', function() {
	it('should GET the average of all skill counts', function(done) {
		request(app)
			.get('/api/skills/average')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array');
				done();
			});
	});
});
/*
counts.map(count =>{
  return count.skills.filter( skill => {
    return skill.name === 'javascript';
  });
});
function reduceIt(skillName) {
const requested = [].concat.apply([], counts.map(count =>{
  return count.skills.filter( skill => {
    return skill.name === skillName;
  });
}));

let initialValue = {
  name: skillName,
  stackOverflow: 0,
  indeed: 0,
  twitter: 0
}
const aggregate = requested.reduce( (accumulator, currentValue) => {
  return {
    name: skillName,
    stackOverflow: accumulator.stackOverflow += currentValue.stackOverflow,
    indeed: accumulator.indeed += currentValue.indeed,
    twitter: accumulator.twitter += currentValue.twitter
  }
}, initialValue);
			//console.log(aggregate);
      return aggregate;
}

var total = counts[0].skills.map(skill => {
  return reduceIt(skill.name);
});

console.log(total);
*/
