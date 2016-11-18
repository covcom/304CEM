'use strict'

const rand = require('csprng')
const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

const status = {
	'ok': 200,
	'created': 201,
	'notModified': 304,
	'notFound': 404
}

const defaultPort = 8080

const lists = []

server.get('/', (req, res, next) => {
	res.redirect('/lists', next)
})

server.get('/lists', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('Allow', 'GET, POST')
	try {
		if (lists.length === 0) throw new Error('no lists found')
		const data = []
		for(let i=0; i<lists.length; i++) {
			data.push({name: lists[i].name, id: lists[i].id})
		}
		res.send(status.ok, {lists: data})
	} catch(err) {
		console.log('error')
		res.send(status.notFound, {message: err.message})
	} finally {
		res.end()
	}
})

server.get('/lists/:listID', (req, res) => {
	const listID = req.params.listID

	res.setHeader('content-type', 'application/json')
	res.setHeader('Allow', 'GET, POST')
	try {
		if (lists === undefined) throw new Error('no lists found')
		let matchingID = -1

		for (let i=0; i< lists.length; i++) {
			if (lists[i].id === listID) matchingID = i
		}
		if(matchingID === -1) throw new Error(`list with id ${listID} not found`)
		res.send(status.ok, lists[matchingID])
	} catch(err) {
		res.send(status.notFound, {message: err.message})
	} finally {
		res.end()
	}
})

server.post('/lists', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('Allow', 'GET, POST')
	try {
		if (req.body === undefined || typeof req.body.name !== 'string' || !Array.isArray(req.body.list)) {
			throw new Error('invalid list data')
		}
		const list = { id: rand(130, 36), name: req.body.name, modified: new Date(), list: req.body.list }

		lists.push(list)
		res.send(status.created, list)
	} catch(err) {
		res.send(status.notFound, {message: err.message})
	} finally {
		res.end()
	}
})

server.put('/lists/:listID', function(req, res) {
	res.setHeader('content-type', 'application/json')
	res.setHeader('Allow', 'GET, POST', 'PUT', 'DELETE')
	res.send(status.ok, { message: 'this should update the specified resource'} )
	res.end()
})

server.del('/lists/:listID', function(req, res) {
	res.setHeader('content-type', 'application/json')
	res.setHeader('Allow', 'GET, POST', 'PUT', 'DELETE')
	res.send(status.ok, { message: 'this should delete the specified resource'} )
	res.end()
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready at : ${port}`)
	}
})
