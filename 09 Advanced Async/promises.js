
'use strict'

const request = require('request')

const getData = base => new Promise( (resolve, reject) => {
	const url = `http://api.fixer.io/latest?symbols=${base}`
	console.log(url)
	request.get(url, (err, res, body) => {
		if (err) reject(new Error(`could not get conversion rate for ${base}`))
		resolve(JSON.parse(body))
	})
})

const cleanData = data => new Promise( resolve => {
	resolve(data.rates.USD)
})

getData('USD').
then( data => cleanData(data)).
then( data => console.log(data)).
catch( err => console.error('There was a problem'))
