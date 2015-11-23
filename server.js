require('node-jsx').install({ extension: '.jsx' })

var express = require('express'),
	request = require('supertest'),
	port    = process.env.PORT || 3000,
	foursquare = require('node-foursquare-venues')('RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF', '4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ');
	React   = require('react'),
	ReactDOMServer = require('react-dom/server'),
	myComponent = require("./server/components/VenuesList.jsx"),
	ReactComponent = React.createFactory(myComponent),
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
		
		var reactHtml = ReactDOMServer.renderToString(ReactComponent({ data: response.response.groups[0].items })); 
		res.render('venues', { helloComponentMarkup: reactHtml, data: response.response.groups[0].items });
	});


});

//Startup Server
var server = app.listen(port, function() {
	console.log('listening on port ' + port);
});

module.exports = server;