
var sync = require('sync-request');

var home;

exports.setHome = function(location, callback) {
	this.home = getLatLon(location);
	//this.home = loc.lat+','+loc.lng;
	callback(this.home);
};

exports.getFare = function(destination, callback) {
	var dest = getLatLon(destination);
	var url = 'https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin=';
	console.log(url+this.home+'&destination='+dest);
	var res = sync('GET', url+this.home+'&destination='+dest);
	data = JSON.parse(res.getBody().toString('utf8'));
	var distance = data.routes[0].legs[0].distance.text;
	var duration = data.routes[0].legs[0].duration.text;
	callback({distance: distance, duration: duration});
};

function getLatLon(address) {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?region=uk&address=';
	var res = sync('GET', url+address);
	data = JSON.parse(res.getBody().toString('utf8'));
	var loc = data.results[0].geometry.location;
	return loc.lat+','+loc.lng;
}
