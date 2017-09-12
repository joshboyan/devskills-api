var app = require('../server');
var expect = require('chai').expect;
var request = require('supertest');

describe('/resources', () => {
	it('should GET all the resources', done => {
		request(app)
        .get('/resources')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, res) => {
            expect(res.body).to.be.an('array')
            done();
        });	
	});
});

describe('/resources/:skill', () => {
	it('should GET the resources for a certain skill', done => {
		request(app)
        .get('/resources')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, res) => {
            expect(res.body).to.be.an('array')
            done();
        });	
	});
});

describe('/resources/:skill', () => {
	it('should POST a resources to a certain skill', done => {
		request(app)
        .post('/resources')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end( (err, res) => {
            expect(res.body).to.be.an('array')
            done();
        });	
	});
});