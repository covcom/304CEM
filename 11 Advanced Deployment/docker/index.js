
'use strict'

const fs = require('fs')
const restify = require('restify')
const server = restify.createServer()
const port = 8080

server.listen(port, function() {
	console.log('incoming request being handled')

	server.get('/', function(req, res) {
		console.log('GET request received');
		const filename = `data/${Math.round(+new Date()/1000)}.json`

		console.log(filename)
		fs.writeFile(filename, {msg: 'Docker is Great!'}, () => {
			console.log('The file was saved!')
			res.setHeader('content-type', 'application/json')
			res.send({msg: 'Hello World!'})
			res.end()
		})
	})
})
