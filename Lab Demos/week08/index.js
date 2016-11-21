const restify = require('restify')
const server = restify.createServer()

const googleapi = require('./modules/booksquery')

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

server.get('/booksearch', googleapi.doBookSearch)

const port = process.env.PORT || 8080
server.listen(port, err => console.log(err || `App running on port ${port}`))
