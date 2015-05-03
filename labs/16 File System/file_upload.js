
//var fs = require('fs');
var mv = require('mv');
var uuid = require('node-uuid');
var mime = require('mime');
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser({
    mapFiles: true
}));

var uploadImage = function(path, mimetype, callback) {
	var image_id = uuid.v1();
	console.log(image_id);
	var ext = mime.extension(mimetype);
    var filename = 'images/'+image_id+'.'+ext;
	console.log(filename);
    mv(path, filename, function(err) {
        if (err) {
            throw err;
        }
        callback(image_id);
    });
};

server.post('/images', function(req, res) {
    uploadImage(req.files.myImage.path, req.files.myImage.type, function(image_id) {
        res.send(image_id);
        res.end();
    });
});

server.listen(3000);