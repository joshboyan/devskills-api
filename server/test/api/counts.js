var app = require('../server');
var expect = require('chai').expect;
var request = require('supertest');

describe('/skills', () => {
	it('should GET all the skill counts', done => {
		request(app)
			.get('/skills')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array')
				done();
			});	
	});
});

describe('/skills/latest', () => {
	it('should GET the latest skill counts', done => {
		request(app)
			.get('/skills/latest')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('object')
				done();
			});	
	});
});

describe('/skills/average', () => {
	it('should GET the average of all skill counts', done => {
		request(app)
			.get('/skills/average')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('object')
				done();
			});	
	});
});

describe('/skills/:skill', () => {
	it('should GET all the dat about a certain skill', done => {
		request(app)
			.get('/skills/:skill')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array')
				done();
			});	
	});
});
describe('/skills/:skill/latest', () => {
	it('should GET the latest data about a skill', done => {
		request(app)
			.get('/skills/:skill/latest')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('object')
				done();
			});	
	});
});
describe('/skills/:skill/average', () => {
	it('should GET the average counts for a skill', done => {
		request(app)
			.get('/skills/:skill/average')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('object')
				done();
			});	
	});
});