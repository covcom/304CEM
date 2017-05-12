
'use strict'

const request = require('request')

const getInput = prompt => new Promise( (resolve) => {
	process.stdin.resume()
	process.stdin.setEncoding('utf8')
	process.stdout.write(`${prompt}: `)
	process.stdin.on('data', text => resolve(text))
})

const checkValidCurrencyCode = code => new Promise( (resolve, reject) => {
	code = code.trim()
	request('http://api.fixer.io/latest', (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) it.throw(new Error(`invalid currency code ${code}`))
		resolve()
	})
})

const getData = url => new Promise( (resolve, reject) => {
	request(url, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		resolve(body)
	})
})

const printObject = data => new Promise( (resolve) => {
	const indent = 2
	data = JSON.parse(data)
	const str = JSON.stringify(data, null, indent)
	console.log(str)
	resolve()
})

getInput('enter base currency')
	.then( data => {
		this.base = data
	})
	.then( () => checkValidCurrencyCode(this.base))
	.then( () => getData(`http://api.fixer.io/latest?base=${this.base}`))
	.then( data => printObject(data))
	.then( () => {
		process.exit()
	})
	.catch( err => console.error(`error: ${err.message}`))
