
// this example shows how to use a genrerator to simplify async code
// after understanding this you should move onto promises
// based on code by https://davidwalsh.name/async-generators

'use strict'

const request = require('request')

function *main() {
	try {
		const base = yield getInput('enter base currency')
		yield checkValidCurrencyCode(base)
		const body = yield getData(`http://api.fixer.io/latest?base=${base}`)
		const obj = JSON.parse(body)
		printObject(obj)
	} catch(err) {
		console.log(err.message)
	}
	process.exit()
}

function getInput(prompt) {
	process.stdin.resume()
	process.stdin.setEncoding('utf8')
	process.stdout.write(`${prompt}: `)
	process.stdin.on('data', text => it.next(text))
}

function checkValidCurrencyCode(code) {
	code = code.trim()
	request('http://api.fixer.io/latest', (err, res, body) => {
		if (err) it.throw(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) it.throw(new Error(`invalid currency code ${code}`))
		it.next()
	})
}

function getData(url) {
	// the async call is 'hidden' in this function
	request(url, (err, res, body) => {
		if (err) it.throw(new Error('invalid API call'))
		it.next(body)
	})
	// the function does not return anything
}

function printObject(data) {
	const indent = 2
	const str = JSON.stringify(data, null, indent)
	console.log(str)
}

const it = main()
it.next()
