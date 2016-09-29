'use strict'

const readline = require('readline-sync')
const request = require('sync-request')

// the first step is to get a JavaScript object containing the exchange rates
const base = 'GBP'
const url = `http://api.fixer.io/latest?base=${base}`
const res = request('GET', url)
const rates = JSON.parse(String(res.getBody())).rates
console.log(JSON.stringify(rates, null, 2))

// ask the user for the currency code, convert to uppercase and remove whitespace.
const code = String(readline.question('enter required currency code: ')).toUpperCase().trim()
console.log(`you chose code: "${code}"`)

// does the currency code exist as a key in the rates object?
if (rates.hasOwnProperty(code)) {
  console.log(`currency code ${code} is valid`)
  const exchange = rates[code]
  console.log(`exchange rate between ${base} and ${code} is ${exchange}`)
}
