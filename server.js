
var express = require('express'),
	async    = require('async'),
	port    = process.env.PORT || 3000,
	foursquare = require('node-foursquare-venues')('RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF', '4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ'),
	app     = express();



//Static files
app.use(express.static(__dirname + '/client'));

//EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/server/views');

//Routes
app.get('/', function(req , res) {

	res.render('index');
});


app.get('/about', function(req, res) {
	res.render('about');
});


app.get('/venues', function(req, res) {
	var type = req.query.searchTerm;
	var latLng = "" + req.query.lat + "," + req.query.lng + ""; 

	foursquare.venues.explore({ll: latLng, query: type, radius: "10000", venuePhotos: "1", limit: "25"}, function(err, response) {
		if(err) 
			res.status(500);	
		res.render('venues', { venues: response.response.groups[0].items });
	});


});

app.get('/venue/:id', function(req, res) {

	//should create an async call that calls
	//for venue data,venue photos, AND similar venues using async library
	//async.parallel call and return an object that contains 
		//1). venue: venue information
		//2). venuePhotos: venue photos
		//3). 	similarVenues: similar venue information

	async.parallel({
	    venue: function(callback){
				foursquare.venues.venue(req.params.id, {}, function(err, response) {
					if(err) {
						res.status(500).send({error: "error with API"});
					}
					callback(null,response.response.venue);
				});
				  
	    },
	    photos: function(callback){    
				foursquare.venues.photos(req.params.id, {}, function(err, response) {
					if(err) {
						res.status(500).send({error: "error with API"});
					}
					callback(null,response.response.photos.groups[1].items);
				});
				
	    },
	    similarVenues: function(callback) {
				foursquare.venues.similar(req.params.id, {}, function(err, response) {
					if(err) {
						res.status(500).send({error: "error with API"});
					}
					callback(null, response.response.similarVenues.items);
				});
	    }
	},
	function(err, results) {
	    // results is now equals to: {one: 1, two: 2}
			if(err) {
				console.log(err);
			}
			res.render('venue', {venue: results});
	});	



});

//Startup Server
app.listen(port, function() {
	console.log('listening on port ' + port);
});

