// import the HTTP client module
var request = require('request');

// set up the base URL
var url = 'http://api.openweathermap.org/data/2.5/weather'

// define a function to send a GET request with the city desired
function checkWeather(city, callback) {
    var query_string = {q: city};    
    request.get({url: url, qs: query_string}, callback);
}

// async callback to process what comes back from the request
function logWeather(error, response, body){
    if (error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
}

// make the weather checker available in other scripts
module.exports.checkWeather = checkWeather;
module.exports.logWeather = logWeather;
