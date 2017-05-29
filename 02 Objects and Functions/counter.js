
//'use strict'

(function() {
	console.log('Woohoo!')
})()

// simple closure example (using an IIFE)
const add = ( () => {
	let count = 0
	return () => count += 1
})()

add()
add()
console.log(add())

// IIFE returning multiple functions via an object
(function() {
	let count = 0
	return {
		increment: () => count += 1,
		display: () => count,
		reset: () => count = 0
	}
})()

counter.increment()
counter.increment()
console.log(counter.display())
counter.reset()
console.log(counter.display())
