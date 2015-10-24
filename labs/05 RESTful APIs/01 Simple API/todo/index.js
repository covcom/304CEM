

var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())

var lists = require('./lists.js');

server.get('/', function(req, res, next) {
  res.redirect('/lists', next)
})

server.get('/lists', function(req, res) {
  console.log('getting a list of all the lists')
  var data, type
  if (req.header('Accept') === 'application/xml') {
    data = lists.getAllXML()
  } else {
    data = lists.getAll()
  }
  console.log(data)
  res.setHeader('content-type', data.contentType)
  res.send(data.code, data.response)
  res.end()
})

server.get('/lists/:listID', function(req, res) {
  console.log('getting a list based on its ID')
  const listID = req.params.listID
  const data = lists.getByID(listID)
  res.setHeader('content-type', 'application/json')
  res.send(data.code, data.response)
  res.end()
})

server.post('/lists', function(req, res) {
  console.log('adding a new list')
  const body = req.body
  const data = lists.addNew(body)
  res.setHeader('content-type', 'application/json')
  res.send(data.code, data.response)
  res.end()
})

server.put('/lists/:listID', function(req, res) {
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: 'this should update the specified resource'})
  res.end()
})

server.del('/lists/:listID', function(req, res) {
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: 'this should delete the specified resource'})
  res.end()
})

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('App is ready at : ' + port);
    }
});
