'use strict';

var request = require('supertest');
var expect = require('expectacle');
var foursquare = require('node-foursquare-venues')('RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF', '4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ');
var assert = require('chai').assert;

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
	it('responds to /venues', function (done) {
		this.timeout(5000);
		request(server)
			.get('/venues')
			.end(function(err, res) {
							
				foursquare.venues.explore({ll: '37.7749295,-122.41941550000001', query: 'steak', radius: "10000", venuePhotos: "1", limit: "25"}, function(err, response) {
					
					if(err)
						return done( err );
					assert.equal(response.meta.code, 200);

					done();
				});
			});
	});



});