'use strict'
/* import the 'restify' module and create an instance. */
const restify = require('restify')
const server = restify.createServer()

server.use(restify.bodyParser())

const port = process.env.PORT || 8080

/* if we receive a GET request for the base URL redirect to /lists */
server.get('/', function(req, res, next) {
  let data = "It works"
	res.send(200, data)
  res.end()
})

server.get('/anotherURL', function(req, res, next) {
  let data = "You asked for another URL"
  res.send(200, data)
  res.end()
})

server.post('/users', function(req, res, next) {
  let body = req.body
  let message = `your data was: ${body}`
  res.send(200, message)
  res.end()
})

server.listen(port, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
