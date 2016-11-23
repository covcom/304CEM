'use strict'

const restify = require('restify')
const server = restify.createServer()

const googleapi = require('./modules/booksquery')
const favourites = require('./modules/favourites')
const authorization = require('./modules/authorisation')
const users = require('./modules/users')

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

server.get('/booksearch', googleapi.doBookSearch)

server.get('/favourites', authorization.authorize, favourites.list)  // get a list of all favs
server.post('/favourites', authorization.authorize, favourites.validate, favourites.add)  // add a new fav
server.get('/favourites/:id', authorization.authorize, favourites.get)  // get details of a particular fav using id
server.put('/favourites/:id', authorization.authorize, favourites.validate, favourites.update)  // update details of existing fav using id
server.del('/favourites/:id', authorization.authorize, favourites.delete)  // delete existing fav using id

server.post('/users', users.validate, users.add)  // add a new user to the DB (pending confirmation)
server.post('/users/:username', users.validateConfirmation, users.confirm)  // confirm a pending user
server.del('/users/:username', authorization.authorize, users.delete)  // delete a user

const port = process.env.PORT || 8080

server.listen(port, err => console.log(err || `App running on port ${port}`))
