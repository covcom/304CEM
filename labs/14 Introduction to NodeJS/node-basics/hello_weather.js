var express = require('express');
var app = express();

// import your own module
var weather = require('./weather_module');
// access the exported attribute that we need
var checkWeather = weather.checkWeather;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/weather', function(req, res) {
   checkWeather("coventry,uk", getWeatherDescription);
    
   // define a new callback to get the weather description
   function getWeatherDescription(error, response, body) {
       if (error) {
           console.log(error);
           res.end(error);
       } else {
           console.log(response.statusCode, body);
           res.end("<h1>Weather Data</h1><br>" + body);
       }
   }
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});