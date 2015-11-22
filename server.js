var express = require('express'),
	request = require('supertest'),
	port    = process.env.PORT || 3000,
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

//Startup Server
var server = app.listen(port, function() {
	console.log('listening on port ' + port);
});

module.exports = server;