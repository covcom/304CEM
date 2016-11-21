
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

Promise.race(itemPromises)
	.then( result => {
			 console.log(result)
	}).catch( err => {
		console.log(`error: ${err.message}`)
	})

const orig = [1, 2, 3, 4, 5, 6]
const res = orig
	.filter( num => num % 2 === 0)
	.map( num => num * num)
	.reduce( (acc, val) => acc + val, 10)

console.log(res)


