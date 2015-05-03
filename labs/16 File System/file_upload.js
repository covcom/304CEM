
var fs = require('fs');
var mv = require('mv');
var uuid = require('node-uuid');
var mime = require('mime');
var glob = require('glob');
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

server.post('/', function(req, res) {
    uploadImage(req.files.image.path, req.files.image.type, function(image_id) {
        //res.send(image_id);
		var data = {status: 'success', image_id: image_id};
        res.send(data);
		res.end();
    });
});

server.del('/', function(req, res) {
	console.log('DELETE');
	console.log(req.body.image_id);
	glob('images/'+req.body.image_id+'.*', function(err, files) {
		console.log(files);
		fs.unlink(files[0], function(err) {
			console.log('attempting to delete file');
			if (!err) {
				console.log('file deleted');
				var data = {status: 'success', image_id: req.body.image_id};
				res.send(data);
				res.end();
			}
		});
	});
	res.end();
});

server.listen(3000);