var app = require('./app');
var expect = require('chai').expect;
var request = require('supertest');

describe('/skills', () => {
	it('should GET all the skill counts', done => {
		request(app)
			.get('/skills')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.done((err,res) => {
				expect(res.id).tobeDefined();
				done();	
			})
	});
})