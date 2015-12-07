"use strict"

const request = require('request')

console.log(process.argv)

try {
	if (process.argv.length !== 3) {
		throw 'missing parameter'
	}
	let address = process.argv[2]
	const url_string = 'https://maps.googleapis.com/maps/api/geocode/json'
	const query_string = {region: 'gb', address: address, units: "metric", appid: "44c39f3fa462f86b3fc88f5678e5c5ff"}
	request.get({url: url_string, qs: query_string}, function(err, res, body) {
	if (err) {
		throw 'could not complete request'
	} else {
		//console.log(body)
		const json = JSON.parse(body)
		try { // need to add a try-catch block in the async code to catch errors...
			if (json.status === 'ZERO_RESULTS') {
				throw 'no results found'
			}
			const addr = json.results[0].address_components
			const geometry = json.results[0].geometry
			console.log(JSON.stringify(addr, null, 2))
			console.log(geometry)
		} catch(err) {
			console.log(err)
		}
	}
})
} catch(err) {
	console.log(err)
}
