// import the new module
var weather = require('./weather_module');

// access the exported attribute that we need
var checkWeather = weather.checkWeather;
var logWeather = weather.logWeather;

// use its functionality
checkWeather("coventry,uk", logWeather);
checkWeather("london,uk", logWeather);
