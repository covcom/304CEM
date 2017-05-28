
'use strict'

// example of a nested function
function flights(airline, startCode, endCode) {
	return function printDetails() {
		return `you are flying ${airline} from ${startCode} to ${endCode}`
	}
}

const flight = flights('KLM', 'BHX', 'JFK')
const flightSummary = flight()
console.log(flightSummary)

// https://www.sitepoint.com/javascript-closures-demystified/
