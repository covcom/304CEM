'use strict'

const readline = require('readline-sync')
const quotes = require('./quotes')

const author = String(readline.question('author name: ')).trim()

quotes.getQuotes(author).then(
	data => {
		console.log(data)
	}).catch( err => {
		console.log(`ERROR: ${err}`)
	})

console.log('EOF')
