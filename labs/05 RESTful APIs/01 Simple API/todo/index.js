
var restify = require('restify')
var server = restify.createServer()

var lists = require('./lists.js');

server.get('/lists/:listID', function(req, res) {
  console.log('getting a list based on its ID')
  const listID = req.params.listID
  const data = lists.getByID(listID)
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: data.message})
  res.end()
})

server.get('/lists', function(req, res) {
  console.log('getting a list of all the lists')
  const data = lists.getAll()
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: data.message})
  res.end()
})

server.post('/lists', function(req, res) {
  console.log('adding a new list')
  const data = lists.addNew()
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: data.message})
  res.end()
})

server.put('/lists/:listID', function(req, res) {
  const listID = req.params.listID
  const data = lists.updateByID(listID)
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: data.message})
  res.end()
})

server.delete('/lists/:listID', function(req, res) {
  const listID = req.params.listID
  const data = lists.deleteByID(listID)
  res.setHeader('content-type', 'application/json')
  res.send(data.code, {status: data.status, message: data.message})
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
