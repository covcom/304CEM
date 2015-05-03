
var fs = require('fs');
var mv = require('mv');
var mime = require('mime');
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser({
    mapFiles: true
}));

var uuid = require('node-uuid');
var fs = require('fs');

var uploadImage = function(path, mimeType, callback) {
    var filename = 'images/'+uuid.v1()+'.'+mime.extension(mimeType);
	console.log(path);
	console.log(filename);
    mv(path, filename, function(err) {
        if (err) {
            throw err;
        }
        callback(filename);
    });
};

server.post('/images', function(req, res) {
	console.log(req.files);
	
	for (var image in req.files) {
		console.log(image);
	}
	console.log(req.files.myImage.type);
    uploadImage(req.files.myImage.path, req.files.myImage.type, function(filename) {
        res.send(filename);
        res.end();
    });
});

server.listen(3000);