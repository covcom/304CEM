const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

const port = process.env.PORT || 8080
server.listen(port, err => console.log(err || `App running on port ${port}`))
