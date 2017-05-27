#!/usr/bin/env node

'use strict'

const sentiment = require('sentiment')
const minParam = 3

try {
	console.log(process.argv)
	if (process.argv.length < minParam) throw new Error('missing parameters')
	const words = process.argv.slice(minParam-1).join(' ')
	console.log(words)
	const result = sentiment(words)
	console.log(result)
} catch(err) {
	console.log(err.message)
}
