
'use strict'

// simple closure example (using an IIFE)
const add = ( () => {
	let count = 0
	return () => count += 1
})()

add()
add()
console.log(add())

// IIFE returning multiple functions via an object
const counter = ( () => {
	let count = 0
	return {
		increment: () => count += 1,
		display: () => count,
		reset: () => count = 0
	}
})()

//console.log(count)

counter.increment()
counter.increment()
console.log(counter.display())
counter.reset()
console.log(counter.display())
