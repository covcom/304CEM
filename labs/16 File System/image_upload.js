
var fs = require('fs');
var restify = require('restify');  
var server = restify.createServer();
server.use(restify.bodyParser());

var upload = require('./modules/upload');

server.post('/images', function(req, res) {
	upload.uploadImage(req.params.myImage, function(filename) {
		console.log('processing image');
		res.send(filename);
		res.end();
	});
	res.send('sync message');
});

server.listen(3000);