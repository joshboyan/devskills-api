/**
 * Integration tests for counts router
 */
var app = require('../../../../server/index.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('./test/server/integration/counts', function() {

	context('/api/skills route', function() {
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

	context('/api/skills/latest', function() {
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

	context('/api/skills/average', function() {
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

});
