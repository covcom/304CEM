'use strict'
/* import the 'restify' module and create an instance. */
const restify = require('restify')
const server = restify.createServer()

server.use(restify.bodyParser())

const port = process.env.PORT || 8080

// basic response from the root endpoint
server.get('/', function(req, res, next) {
  let data = "It works"
	res.send(200, data)
  res.end()
})

// another call to get sets up another route
server.get('/anotherURL', function(req, res, next) {
  let data = "You asked for another URL"
  res.send(200, data)
  res.end()
})

// other http verbs can be used
// with `post` you can access the data sent using the request body
// this needs the `bodyParser()` line above to work
server.post('/users', function(req, res, next) {
  let body = req.body
  let message = `your data was: ${body}`
  res.send(200, message)
  res.end()
})

// now run the server and print a message to tell if it worked
server.listen(port, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
