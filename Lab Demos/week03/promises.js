
'use strict'

const request = require('request')

try {
	if (process.argv.length < 3) {
		throw 'missing parameter'
	}
	const symbol = process.argv[2].toUpperCase()
	getData(symbol)
		.then( (result) => {
			print(result)
		}).catch( (error) => {
			console.log(error)
		})
} catch(err) {
	console.log(err)
}

function getData(symbol) {
	return new Promise( (resolve, reject) => {
		const url = `http://api.fixer.io/latest?symbols=${symbol}`
		request.get( url, (err, res, body) => {
			if (err) {
				reject('could not complete request')
			}
			const json = JSON.parse(body)
			resolve(json)
		})
	})
}

function print(data) {
	return new Promise( (resolve, reject) => {
		if (data.rates === undefined) {
			reject('missing rates array')
		}
		console.log(data.rates)
		resolve(data.rates)
	})
}