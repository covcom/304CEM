
var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

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
