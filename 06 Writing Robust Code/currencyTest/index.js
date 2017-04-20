
'use strict'

const currency = require('currency')

try {
	getInput('enter base currency', (err, data) => {
		if (err) throw err
		const base = data
		getInput('enter currency required', (err, data) => {
			if (err) throw err
 			const symbol = data
			getInput('enter amount to convert', (err, data) => {
				if (err) throw err
				const units = data
				currency.convert(base, symbol, units, (err, data) => {
					if (err) throw err
					console.log(`${data} ${symbol}`)
				})
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
		process.stdin.on('data', text => callback(null, text.trim()))
	} catch(err) {
		callback(err)
	}
}
