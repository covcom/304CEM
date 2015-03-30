
// weather-spec.js
var list = require("../modules/weather");

describe("Weather Forecast", function(data) {
	it('should get weather for London,UK', function(done) {
		list.get('London,UK', function(data) {
			expect(data).toEqual('London,UK');
			done();
		});
	});
});
