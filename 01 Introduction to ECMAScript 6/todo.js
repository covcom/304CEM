'use strict'

const readline = require('readline-sync')

const items = []

do {
	var input = String(readline.question('enter command: ')).trim()
	if (input.indexOf('add ') === 0) {
		const space = input.indexOf(' ')
		const item = input.substring(space).trim()
		console.log(`adding "${item}"`)
		items.push(item)
	}
	if (input.indexOf('list') === 0) {
		for (let i=0; i< items.length; i++) {
			console.log(`${i}. ${items[i]}`)
		}
	}
} while (input !== 'exit')
