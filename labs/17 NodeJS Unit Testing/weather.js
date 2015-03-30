
var weather = require('./modules/weather');

console.time('getting geoData');
weather.getGeo('London,UK', function(data) {
	console.log(data);
	console.timeEnd('getting geoData');
});