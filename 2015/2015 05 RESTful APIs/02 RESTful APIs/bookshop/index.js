
/* BOOKSHOP API */

var fs = require('fs')

var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

var accounts = require('./accounts.js')
var books = require('./books.js')

server.get('/library', function(req, res) {
  console.log('GET /library')
  const searchTerm = req.query.q
  console.log('q='+searchTerm)
  books.search(searchTerm, function(data) {
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

//
server.post('/accounts', function(req, res) {
  console.log('POST /accounts')
  const auth = req.authorization
  const body = req.body
  console.log(body)
  const host = req.headers.host
  console.log(typeof req.files)
  accounts.add(host, auth, body, req.files, function(data) {
    console.log('DATA RETURNED')
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

server.get(/images\/?.*/, restify.serveStatic({
    directory: __dirname
}))

fs.mkdir('images', function(err) {
  if (err) {
    console.log('error creating images directory')
  }
  console.log('images directory created')
})

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})
