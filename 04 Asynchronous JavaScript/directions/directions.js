
'use strict'

const readline = require('readline-sync')
const request = require('request')

const origin = String(readline.question('start address: ')).trim()
const destination = String(readline.question('finish address: ')).trim()

const url = 'https://maps.googleapis.com/maps/api/directions/json?region=gb&origin='+origin+'&destination='+destination
console.log(url)

request.get(url, (err, res, body) => {
	if (err) {
		throw 'could not complete request'
	} else {
		//console.log(body)
		const json = JSON.parse(body)
		const route = json.routes[0].legs[0]
		//console.log(route)
		console.log(route.start_address)
		console.log(route.end_address)
	}
})
