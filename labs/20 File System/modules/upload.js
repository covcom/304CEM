
var uuid = require('node-uuid');
var fs = require('fs');

exports.uploadImage = function(base64Str, callback) {
	var filename = 'images/'+uuid.v1()+'.png';
	var bitmap = new Buffer(base64Str, 'base64');
	fs.writeFileSync(filename, bitmap);
	callback(filename);
};