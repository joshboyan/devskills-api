/**
 * Integration tests for skills router
 */
var app = require('../../index.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('/api/skill/:skill', function() {
	it('should GET all the data about a certain skill', function(done) {
		request(app)
			.get('/api/skill/java')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array');
				done();
			});
	});
});

describe('/api/skill/:skill/latest route', function() {
	it('should GET the latest data about a skill', function(done) {
		request(app)
			.get('/api/skill/java/latest')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(1);
				done();
			});
	});
});

describe('/api/skill/:skill/average route', function() {
	it('should GET the average counts for a skill', function(done) {
		request(app)
			.get('/api/skill/java/average')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end( (err, res) => {
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(1);
				done();
			});
	});
});
