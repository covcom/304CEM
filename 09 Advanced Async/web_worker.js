
'use strict'

const Worker = require('webworker-threads').Worker

const worker = new Worker( () => {
	this.postMessage('sending a message from inside the worker')
	this.onmessage = event => {
		console.log(`received message from main thread: ${event.data}`)
		this.close()
	}
})

worker.onmessage = event => {
	console.log(`received message from worker: ${event.data}`)
}

worker.postMessage('sending message from main thread')
