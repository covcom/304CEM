'use strict'

const restify = require('restify')
const server = restify.createServer()

const googleapi = require('./modules/booksquery')
const favourites = require('./modules/favourites')
const authorization = require('./modules/authorisation')

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

server.get('/booksearch', googleapi.doBookSearch)

server.get('/favourites', authorization.authorize, favourites.list)  // get a list of all favs
server.post('/favourites', authorization.authorize, favourites.add)  // add a new fav
server.get('/favourites/:id', favourites.get)  // get details of a particular fav using id
server.put('/favourites/:id', favourites.update)  // update details of existing fav using id
server.del('/favourites/:id', favourites.delete)  // delete existing fav using id

const port = process.env.PORT || 8080

server.listen(port, err => console.log(err || `App running on port ${port}`))
