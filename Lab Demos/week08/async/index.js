// main file to define the API endpoints and their handler chains

'use strict'

const restify = require('restify')
const server = restify.createServer()

const books = require('./handlers/books')
const favourites = require('./handlers/favourites')
const authorize = require('./handlers/authorize')
const users = require('./handlers/users')

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

server.get('/books', books.validate, books.search)

server.get('/favourites', authorize, favourites.list)  // get a list of all favs
server.post('/favourites', authorize, favourites.validate, favourites.add)  // add a new fav
server.put('/favourites', authorize, favourites.validate, favourites.update)  // update details of existing fav
server.get('/favourites/:id', authorize, favourites.get)  // get details of a particular fav using id
server.del('/favourites/:id', authorize, favourites.delete)  // delete existing fav using id

server.post('/users', users.validate, users.add)  // add a new user to the DB (pending confirmation)
server.post('/users/confirm/:username/:confirmation_code', users.confirm)  // confirm a pending user
server.del('/users', authorize, users.delete)  // delete the currently authorized user

const port = process.env.PORT || 8080

server.listen(port, err => console.log(err || `App running on port ${port}`))
