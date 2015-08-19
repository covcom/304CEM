
// import the HTTP client module
var request = require('request');

// set up the base URL
var url = 'http://api.openweathermap.org/data/2.5/weather';

// define a function to send a GET request with the city desired
function checkWeather(city, callback) {
   var query_string = {q: city, units: "metric"};
   request.get({url: url, qs: query_string}, callback);
}

// async callback to process what comes back from the request
function logWeather(error, response, body){
	if (error) {
		console.log(error);
	} else {
		// convert the JSON-formatted string into a JavaScript object 'data'
		var data = JSON.parse(body);
		// convert a JavaScript object 'data' into a nicely formatted string for printing
		var prettyBody = JSON.stringify(data, null, 4);
		console.log('STATUS CODE: '+response.statusCode);
		//console.log(JSON.stringify(response, null, 4));
		console.log(prettyBody);
		console.log('################');
		console.log(data.name);
		console.log(data.sys.country);
		console.log(data.weather[0].description);
		console.log('################');
	}
}
					
// call the function to check the weather!
checkWeather("coventry,uk", logWeather);