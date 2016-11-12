
'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const bookshop = require('./bookshop.js')
const status = {
	ok: 200,
	badRequest: 400
}
const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/books', next)
})

// collection used for searching for books. Requires a 'q' parameter
server.get('/books', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	console.log(req.host)
	const host = req.host || 'localhost'

	try {
		if (req.params.q === undefined) throw new Error('query prameter missing')
		const data = bookshop.search(req.params.q, host)

		console.log('DATA')
		res.send(status.ok, data)
	} catch(err) {
		console.log(err)
		res.send(status.badRequest, {error: err.message})
	} finally {
		res.end()
	}
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
