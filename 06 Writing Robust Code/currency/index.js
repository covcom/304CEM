
'use strict'

const request = require('request')
const decimalPlaces = 2

exports.convert = (base, currency, units, callback) => {
	try {
		checkValidCurrencyCode(base, err => {
			if (err) callback(err)
			checkValidCurrencyCode(currency, err => {
				if (err) callback(err)
				getData(`http://api.fixer.io/latest?base=${base}&symbols=${currency}`, (err, data) => {
					if (err) callback(err)
					const obj = JSON.parse(data)
					//printObject(obj)
					const result = parseFloat((obj.rates[currency] * units).toFixed(decimalPlaces))
					//console.log(result)
					callback(null, result)
				})
			})
		})
	} catch(err) {
		console.log(err.message)
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

