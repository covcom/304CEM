
var weather = require('./modules/weather');

weather.getGeo('London,UK', function(data) {
	console.log(data);
});