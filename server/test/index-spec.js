/**
 * Integration tests for index.js server directory entry point
 */
var app = require('../index.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('Main server routes', function() {
	it('Should return static file from root', function(done) {
		request(app)
			.get('/')
			.set('Accept', 'basic')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function(err, res) {
				expect(res.body).to.be.an('object');
				console.log(res.body);
				done();
			});
	});

	it('Should send a json message from api/ route', function(done) {
		request(app)
			.get('/api')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				expect(res.body).to.be.an('object');
				expect(res.body).to.deep.equal({"message": "This is the base route for the DevSkills API. Remove directories from the URL to get to the docs."})
				done();
			});
	});
});
