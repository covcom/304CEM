'use strict'

const request = require('request')

try {
	if (process.argv.length < 3) {
		throw 'missing parameter'
	}
	const symbol = process.argv[2].toUpperCase()
	const url = 'http://api.fixer.io/latest'
	const querystring = {symbols: symbol}
	request.get({url: url, qs: querystring}, (err, res, body) => {
		if (err) {
			throw 'could not complete request'
		}
		const json = JSON.parse(body)
		const output = JSON.stringify(json.rates, null, 2)
		console.log(output)
	})
} catch(err) {
	console.log(err)
}