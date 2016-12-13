
'use strict'

const Rx = require('rx')
const requests_ = new Rx.Subject() // stream variable

function sendHello(e) {
	console.log('sending hello')

	e.res.writeHead(200, {'Content-Type': 'text/plain'})
	e.res.end('Hello World\n')
}

requests_.subscribe(sendHello)

const http = require('http')

http.createServer( (req, res) => {
	requests_.onNext({req: req, res: res}) // adds an event to the beginning of the stream
}).listen(8080, '127.0.0.1', () => {
	console.log('server running')
})
