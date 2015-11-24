
const restify = require('restify')
const server = restify.createServer()
server.use(restify.bodyParser({ mapFiles: true }))
server.use(restify.authorizationParser())

const auth = require('./auth')

server.post('/accounts', (req, res) => {
  auth.addAccount(req, (err, data) => {
    res.setHeader('content-type', 'application/json')
    if (err) {
      res.send(400, {status: 'error', message: err.message })
    } else {
      res.send(201, {status: 'success', message: 'account created', data: data})
    }
  })
})

server.get('/accounts', (req, res) => {
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
