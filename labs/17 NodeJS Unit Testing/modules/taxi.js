
var sync = require('sync-request');

var home;

exports.setHome = function(location, callback) {
	this.home = getLatLon(location);
	//this.home = loc.lat+','+loc.lng;
	var latLng = this.home.split(',');
	callback({lat:parseFloat(latLng[0]), lng:parseFloat(latLng[1])});
};

exports.getFare = function(destination, callback) {
	var dest = getLatLon(destination);
	var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
	//console.log(url+this.home+'&destination='+dest);
	var res = sync('GET', url+this.home+'&destination='+dest);
	data = JSON.parse(res.getBody().toString('utf8'));
	var distance = parseFloat(data.routes[0].legs[0].distance.value);
	var duration = parseFloat(data.routes[0].legs[0].duration.value);
	duration = Math.round(duration/60);
	distance = parseFloat((distance/1000).toFixed(1));
	var cost = calculateFare(distance, duration);
	callback({distance: distance, duration: duration, cost:cost});
};

function getLatLon(address) {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?region=uk&address=';
	var res = sync('GET', url+address);
	data = JSON.parse(res.getBody().toString('utf8'));
	var loc = data.results[0].geometry.location;
	return loc.lat.toFixed(6)+','+loc.lng.toFixed(6);
}

function calculateFare(distance, duration) {
	var cost = distance*1 + duration*0.1;
	if (cost < 3.2) {
		cost = 3.2;
	}
	return cost;
}
