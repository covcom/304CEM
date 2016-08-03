
const readline = require('readline-sync')
const request = require('request')
const url = 'http://api.openweathermap.org/data/2.5/weather'

const location = String(readline.question('location: ')).trim()+',GB' //otherwise defaults to the US...
const query_string = {q: location, units: "metric", appid: "44c39f3fa462f86b3fc88f5678e5c5ff"}
request.get({url: url, qs: query_string}, (err, res, body) => {
  try {
    if (err) {
      throw err
    } else {
      //console.log(body)
      const json = JSON.parse(body)
      if (json.cod !== 200) { // test with xxxxxxxxxxxxxxxxxxxx
        throw 'location not found'
      }
      const pretty = JSON.stringify(json, null, 2)
      console.log('STATUS CODE: '+res.statusCode)
      console.log(pretty)
      console.log('################')
      console.log(json.name)
      console.log(json.sys.country)
      console.log(json.weather[0].description)
      console.log('################')
    }
  } catch(err) {
    console.log(err)
  }
})
