
/* import the HTTP client module */
var request = require('request')
/* set up the base URL */
const url = 'http://api.openweathermap.org/data/2.5/weather'

const stdin = process.openStdin()

stdin.on('data', function(chunk) {
  /* convert the data to a string and remove leading/trailing whitespace */
  var city = chunk.toString().trim()
  console.log('City: '+city)

  const query_string = {q: city, units: "metric", appid: "44c39f3fa462f86b3fc88f5678e5c5ff"}
  request.get({url: url, qs: query_string}, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(body)
      /* convert the JSON-formatted string into a JavaScript object 'json' */
      const json = JSON.parse(body)
      /* convert a JavaScript object 'json' into a nicely formatted string for printing */
      const pretty = JSON.stringify(json, null, 2)
      /* print the http response status code */
      console.log('STATUS CODE: '+res.statusCode)
      console.log(pretty)
      console.log('################')
      /* extract data from the 'json' object and print it */
  		console.log(json.name)
  		console.log(json.sys.country)
  		console.log(json.weather[0].description)
  		console.log('################')
    }
  })
})
