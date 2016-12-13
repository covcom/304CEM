'use strict'

const request = require('request')

/**
 * wrapper to make sure the callback invokes the generator next() method
 * @param {String} url - the url to callback
 * @returns {undefined} - the yeild
 */
function makeAPICall(url) {
	request.get( url, (err, res, body) => {
		if (err) it.throw(new Error(err))
		it.next(JSON.parse(body))
	})
}

/**
 * the generator
 * @param {String} symbol - the currency symbol to process
 * @returns {undefined} - the yield
 */
function *main(symbol) {
	try {
		const url = `http://api.fixer.io/latest?symbols=${symbol}`
		const result = yield makeAPICall(url)

		console.log(JSON.stringify(result, null, 2))
	} catch(err) {
		console.log(err.message)
	}
}

const it = main('GBP')

it.next()

// https://davidwalsh.name/async-generators