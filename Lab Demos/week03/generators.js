
// this example shows how to use a genrerator to simplify async code
// after understanding this you should move onto promises
// based on code by https://davidwalsh.name/async-generators

'use strict'

const request = require('request')

function *main() {
	const base = yield getInput('enter base currency')
	const body = yield getData(`http://api.fixer.io/latest?base=${base}`)
	const obj = JSON.parse(body)
	print(obj)
	process.exit()
}

function getInput(prompt) {
	process.stdin.resume()
	process.stdin.setEncoding('utf8')
	process.stdout.write(`${prompt}: `)
	process.stdin.on('data', text => it.next(text))
}

function getData(url) {
	// the async call is 'hidden' in this function
	request(url, (err, res, body) => {
		if (err) throw new Error('request error')
		it.next(body)
	})
	// the function does not return anything
}

function print(data) {
	const indent = 2
	const str = JSON.stringify(data, null, indent)
	console.log(str)
}

const it = main()
it.next()
