var express = require('express'),
	port    = process.env.PORT || 3000,
	app     = express();

app.use(express.static(__dirname + '/'));

app.listen(port, function() {
	console.log('listening on port ' + port);
});