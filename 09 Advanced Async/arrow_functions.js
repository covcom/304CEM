
'use strict'

// all four of these functions contain the same functionality.

// traditional JavaScript function that takes an ECMA rest param and returns the total
// no use made of functional programming principles.
function add(...num) {
	let total = 0

	for (let i=0; i< num.length; i++) {
		total += num[i]
	}
	return total
}

// simple ECMAScript 5 compatible anonymous function assigned to a constant.
// Array.prototype.reduce used to eliminate the loop from the previous example.
const add2 = function(...num) {
	return num.reduce( (acc, val) => acc + val)
}

// arrow function syntax used instead of the traditional anonymous function declaration.
// normally a single parameter would not be enclosed in braces but these are needed for rest params.
const add3 = (...num) => {
	return num.reduce( (acc, val) => acc + val)
}

// if the body of the function contains a single line of code that returns a value
// the braces and return statement are not required.
const add4 = (...num) => num.reduce( (acc, val) => acc + val)

console.log(add(1, 2, 3))

console.log(add2(1, 2, 3))

console.log(add3(1, 2, 3))

console.log(add4(1, 2, 3))