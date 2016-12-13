
'use strict'

const restify = require('restify')
const server = restify.createServer()

const myModule = require('module')

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())


server.get('/books', module.searchBooks)

server.get('/favourites', myModule.listFavourites)  // get a list of all favs
server.post('/favourites', myModule.validateFavourite, myModule.addFavourite)  // add a new fav
server.get('/favourites/:id', myModule.getFavourite)  // get details of a particular fav using id
server.put('/favourites/:id', myModule.validateFavourite, myModule.updateFavourite)  // update details of existing fav using id
server.del('/favourites/:id', myModule.deleteFavourite)  // delete existing fav using id

const port = process.env.PORT || 8080

server.listen(port, err => console.log(err || `App running on port ${port}`))