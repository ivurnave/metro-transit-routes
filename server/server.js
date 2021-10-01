var express = require('express');
var app = express();
var server = require('http').Server(app);

var port = process.env.PORT;
if (port == null || port == "") {
	port = 5000;
}

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  	res.sendFile(__dirname + '/index.html');
});

server.listen(port, function () {
  	console.log(`Listening on ${server.address().port}`);
});
