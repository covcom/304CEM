
'use strict'

function largestNumber(a, b) {
	if (a > b) return a
	if (b > a) return b
	return null
}

const biggest = largestNumber(5, 8)
console.log(biggest)
// the code below achieves the same using the 'spread operator'
const nums = [5, 8]
const biggest2 = largestNumber(...nums)
console.log(biggest2)

// example using the arguments object
function add() {
	let total = 0
	console.log(arguments)
	for(let arg of arguments) {
		total += arg
	}
	return total
}

const addNums = add(1, 2, 3, 4)
console.log(addNums)


// example using a rest parameter
function add2(...values) {
	let total = 0
	console.log(values)
	for (let val of values) {
		total += val
	}
	return total
}

const addNums2 = add2(1, 2, 3, 4)
console.log(addNums)


// example with default parameter
function divide(dividend, divisor=1) {
	const quotient = dividend / divisor
	return quotient
}

const quotient = divide(42, 2)
console.log(`calling the divide function with '2' paramters: ${quotient}`)

const quotient2 = divide(42)
console.log(`calling divide function with '1' parameter: ${quotient2}`)


/*
Functions: lots of small functions to carry out maths operators

Needs to cover:

undefined means variable declared but not assigned a value
null is an assignment value (means a value of no value)

1. Function Declaration

- defining a function (function declaration / function expression)
- passing parameters
  - default parameters
  - rest parameters
  - spread syntax - use array as arguments to a function
  - arguments object - show how to iterate over object values (let of)
- return values


Function constructor?
- function constructor vs function declaration?

*/