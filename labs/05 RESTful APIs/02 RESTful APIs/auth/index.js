
const restify = require('restify')
const server = restify.createServer()
server.use(restify.bodyParser({ mapFiles: true }))
server.use(restify.authorizationParser())

const auth = require('./auth')

/* POST is used to create new accounts. The url points to the 'accounts' collection. */
server.post('/accounts', (req, res) => {
  /* we pass the request object to an async function that takes a callback. The first callback parameter is an Error object or null if no errors are returned. The second paramter is the returned data. */
  auth.addAccount(req, (err, data) => {
    /* we will return json data on success or failure */
    res.setHeader('content-type', 'application/json')
    if (err) {
      /* if an error occurs respond with a suitable error code and message. */
      res.send(400, {status: 'error', message: err.message })
    } else {
      /* success! so we return suitable data. */
      res.send(201, {status: 'success', message: 'account created', data: data})
    }
  })
})

/* This GET method is called on the 'accounts' collection and allows us to validate a username and password. */
server.get('/accounts', (req, res) => {
  /* we pass the request object to the function. It takes a second callback parameter which has two parameters, an error (or null) plus the returned data. */
  auth.getAccount(req, (err, data) => {
    res.setHeader('content-type', 'application/json')
    if (err) {
      res.send(401, {status: 'error', message: err.message })
    } else {
      res.send(200, {status: 'success', message: 'account authenticated', data: data})
    }
  })
})

var port = process.env.PORT || 8080
server.listen(port, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('App is ready at : ' + port)
    }
})
