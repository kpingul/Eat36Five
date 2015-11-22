'use strict';

var request = require('supertest');
var expect = require('expectacle');

describe('Testing Routes', function() {
	var server;
	beforeEach(function() {
		server = require('../../server');
	});

	it('responds to /', function (done) {
		request(server)
			.get('/')
			.end(function(err, res) {
				expect(res.status).toBe(200);
				//expect to return index.ejs
				done();
			});
	});

	it('responds to /about', function (done) {
		request(server)
			.get('/about')
			.end(function(err, res) {
				expect(res.status).toBe(200);
				//expect to return about.ejs
				done();
			});
	});


});