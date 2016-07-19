'use strict'

const request = require('request')

//console.log(process.argv)

try {
	if (process.argv.length < 3) {
		throw 'missing parameter'
	}
	/* the Array.slice() function returns a copy of part of the array, in this instance from index 2 to the end. */
	let address = process.argv[2]
	/* we need to remove the single quotes from the string */
	address = address.replace(/'/g,'')
	console.log(address)
	/* this is the URL used to access the Google geolocation service API. */
	const url_string = 'https://maps.googleapis.com/maps/api/geocode/json'
	const query_string = {region: 'gb', address: address, units: 'metric', appid: '44c39f3fa462f86b3fc88f5678e5c5ff'}
	request.get({url: url_string, qs: query_string}, (err, res, body) => {
		if (err) {
			throw 'could not complete request'
		}
		const json = JSON.parse(body)
		try {
			if (json.status === 'ZERO_RESULTS') {
				throw 'no results found'
			}
			console.log(json)
			/* here we extract data from the JSON object */
			const addr = json.results[0].address_components.map( item => item.long_name)
			const geometry = json.results[0].geometry
			console.log(JSON.stringify(addr, null, 2))
			console.log(geometry)
		} catch(err) {
			console.log(err)
		}
	})
} catch(err) {
	console.log(err)
}
