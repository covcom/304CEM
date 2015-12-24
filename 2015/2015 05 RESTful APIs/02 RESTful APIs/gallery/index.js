
const restify = require('restify')
const server = restify.createServer()
server.use(restify.bodyParser({ mapFiles: true }))

const gallery = require('./gallery')

server.post('/gallery', (req, res) => {
  /* addPhoto takes the entire 'request' object as a parameter and returns an Error if something goes wrong. */
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
  gallery.getAllPhotos(req, (err, data) => {
    res.setHeader('content-type', 'application/json')
    if (err) {
      res.send(400, {status: 'error', message: err.message })
    } else {
      res.send(202, {status: 'success', message: 'gallery retrieved', data: data})
    }
  })
})

/* we set up a route to serve static files from the 'photos/' directory. */
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