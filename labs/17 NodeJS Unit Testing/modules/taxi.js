
var sync = require('sync-request');

var home;

exports.setHome = function(location, callback) {
	this.home = getLatLon(location);
	callback(this.home);
};

exports.getFare = function(destination, callback) {
	var dest = getLatLon(destination);
	
};

function getLatLon(address) {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?region=uk&address=';
	var res = sync('GET', url+address);
	data = JSON.parse(res.getBody().toString('utf8'));
	return data.results[0].geometry.location;
}
