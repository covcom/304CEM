
'use strict'

const readline = require('readline-sync')
const quotes = require('./quotes')

const author = String(readline.question('author name: ')).trim()

quotes.getQuotes(author, (err, data) => {
	try {
		if (err) throw err
		console.log(data)
	} catch(err) {
		console.log(`ERROR: ${err.message}`)
	}
})

console.log('EOF')
