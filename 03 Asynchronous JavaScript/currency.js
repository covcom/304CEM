'use strict'

const request = require('request')

try {
	if (process.argv.length < 4) {
		throw 'missing parameter'
	}
	let symbols = process.argv.slice(2)
	const base = symbols.shift().toUpperCase()
	symbols = symbols.join(',').toUpperCase()
	const url = 'http://api.fixer.io/latest'
	const querystring = {base: 'GBP', symbols: 'USD'}
	request.get({url: url, qs: querystring}, (err, res, body) => {
		if (err) {
			throw 'could not complete request'
		}
		const json = JSON.parse(body)
		console.log(json)
		console.log(json.rates)
		symbols.split(',').forEach( element => {
			console.log(element)
			const rate = json.rates[element]
			console.log(`1 ${json.base} = ${rate} ${element}`)
		})
	})
} catch(err) {
	console.log(err)
}