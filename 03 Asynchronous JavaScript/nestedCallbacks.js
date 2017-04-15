
'use strict'

const request = require('request')

try {
	getInput('enter base currency', (err, data) => {
		if (err) throw err
		checkValidCurrencyCode(data, (err, data) => {
			if (err) throw err
			getData(`http://api.fixer.io/latest?base=${data}`, (err, data) => {
				if (err) throw err
				const obj = JSON.parse(data)
				printObject(obj)
			})
		})
	})
} catch(err) {
	console.log(err.message)
}

function getInput(prompt, callback) {
	try {
		process.stdin.resume()
		process.stdin.setEncoding('utf8')
		process.stdout.write(`${prompt}: `)
		process.stdin.on('data', text => callback(null, text))
	} catch(err) {
		callback(err)
	}
}

function checkValidCurrencyCode(code, callback) {
	code = code.trim()
	request('http://api.fixer.io/latest', (err, res, body) => {
		if (err) callback(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) callback(new Error(`invalid currency code ${code}`))
		callback(null, true)
	})
}

function getData(url, callback) {
	request(url, (err, res, body) => {
		if (err) callback(new Error('invalid API call'))
		callback(null, body)
	})
}

function printObject(data) {
	const indent = 2
	const str = JSON.stringify(data, null, indent)
	console.log(str)
}
