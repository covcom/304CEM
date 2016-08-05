
'use strict'

const readline = require('readline-sync')

const minYears = 1
const discount = 0.8

const type = String(readline.question('membership type (basic, premium, gold): ')).trim()
const years = Number(readline.question('years required: '))

try {
	let cost = 0
	if (Number.isNaN(years) || years < minYears) {
		throw 'invalid number of years requested'
	}
	switch (type) {
	case 'basic':
		cost = 10.00
		break
	case 'premium':
		cost = 15.00
		break
	case 'gold':
		cost = 20.00
		break
	default:
		throw 'invalid membership type'
	}
	cost *= years
	if (years > minYears) {
		cost *= discount
	}
	console.log(`membership cost is £${cost}`)
} catch(err) {
	console.log(err)
}
