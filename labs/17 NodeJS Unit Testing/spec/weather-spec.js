
// weather-spec.js
var list = require("../modules/weather");

describe("Weather Forecast", function(data) {
	storage = require('node-persist');
	storage.initSync();
	
	it('clear local cache', function(done) {
		storage.clear(function() {
			//console.log('clear');
			expect(storage.length()).toEqual(0);
			//console.log('cleared');
			done();
		});
	});
	
	it('should get lat and lon for London,UK', function(done) {
		list.getGeo('London,UK', function(data) {
			//console.log('test');
			expect(data.lon).toEqual(-0.12574);
			expect(data.lat).toEqual(51.50853);
			done();
		});
	},15000);
});

// needs comments added.
