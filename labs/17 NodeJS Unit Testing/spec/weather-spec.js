
// weather-spec.js
var list = require("../modules/weather");

describe("Weather Forecast", function(data) {
	it('should get lat and lon for London,UK', function(done) {
		list.getGeo('London,UK', function(data) {
			expect(data.lon).toEqual(-0.12574);
			expect(data.lat).toEqual(51.50853);
			done();
		});
	},15000);
});
