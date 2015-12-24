
var weather = require('./modules/weather');

console.time('getting geoData');
weather.getGeo('London,UK', function(data) {
	console.info(data);
	console.timeEnd('getting geoData');
});