
'use strict'

const data = new Map()

const readline = require('readline-sync')
let input
do {
	input = String(readline.question('enter command: ')).trim()
	debugger
	if (input.indexOf('add ') === 0) {
		const space = input.indexOf(' ')
		const item = input.substring(space).trim()
		console.log(`adding '${item}'`)
		let qty = 1
		debugger
		if (data.has(item)) qty = data.get(item)
		data.set(item, qty)
	}
	if (input.indexOf('list') === 0) {
		data.forEach( (val, key) => {
			process.stdout.write(`${key}\t${val}\n`)
		})
	}
} while (input !== 'exit')
