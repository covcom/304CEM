
'use strict'

const request = require('request')

const itemPromises = ['USD', 'GBP'].map( base => new Promise((resolve, reject) => {
	const url = `http://api.fixer.io/latest?symbols=${base}`

	console.log(url)
	request.get(url, (err, res, body) => {
		if (err) reject(new Error(`could not get conversion rate for ${base}`))
		resolve(body)
	})
}))

Promise.all(itemPromises)
	.then( results => {
		 results.forEach( item => {
			 console.log(item)
		 })
	}).catch( err => {
		console.log(`error: ${err.message}`)
	})
