
// weather-spec.js

/* global expect */

var list = require("../modules/weather");

describe("Weather Forecast", function(data) {
	var storage = require('node-persist');
	storage.initSync();
	
	xit('clear local cache', function(done) {
		storage.clear(function() {
			//console.log('clear');
			expect(storage.length()).toEqual(0);
			//console.log('cleared');
			done();
		});
	});
	
	xit('should get lat and lon for London,UK', function(done) {
		list.getGeo('London,UK', function(data) {
			//console.log('test');
			expect(data.lon).toEqual(-0.12574);
			expect(data.lat).toEqual(51.50853);
			done();
		});
	},15000);
});

// needs comments added.
