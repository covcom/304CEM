const restify = require('restify')
const request = require('request')

var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser({ mapFiles: true }))
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const url = `https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q=${search}`

server.get('/', (req, res) => {
	console.log('Reached')
	res.json({code: 200, data: {status: 'success', message: 'Server is running...'}})
	res.end()
})
