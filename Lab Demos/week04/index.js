'use strict'
/* import the 'restify' module and create an instance. */
const restify = require('restify')
const movies = require('./movies')
const server = restify.createServer()

server.use(restify.bodyParser())  // needed to access req.body (generally for POST, PUT, etc)
server.use(restify.authorizationParser())  // needed to access req.authorization (for securing the API)

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

// accept new movie titles for the DB
server.post('/movies', function(req, res, next) {
	const auth = req.authorization
  let body = req.body
	const data = movies.addNew(auth, body)
  res.send(200, data)
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
