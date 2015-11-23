
const restify = require('restify')
const server = restify.createServer()
server.use(restify.bodyParser({ mapFiles: true }))

const gallery = require('./gallery')

server.post('/gallery', (req, res) => {
  gallery.addPhoto(req, (err, data) => {
    res.setHeader('content-type', 'application/json')
    if (err) {
      res.send(400, {status: 'error', message: err.message })
    } else {
      res.send(201, {status: 'success', message: 'photo uploaded', data: data})
    }
  })
})

server.get('/gallery', (req, res) => {
  gallery.getAllPhotos((err, data) => {
    res.setHeader('content-type', 'application/json')
    if (err) {
      res.send(400, {status: 'error', message: err.message })
    } else {
      res.send(202, {status: 'success', message: 'gallery retrieved', data: data})
    }
  })
})

server.get(/photos\/?.*/, restify.serveStatic({
    directory: __dirname
}))

var port = process.env.PORT || 8080
server.listen(port, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('App is ready at : ' + port)
    }
})