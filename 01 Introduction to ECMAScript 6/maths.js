
'use strict'
/* eslint no-magic-numbers: 0 */

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
	console.log(arguments['1'])
	for(const arg of arguments) {
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
	for (let i=0; i<values.length; i++) {
		total += values[i]
	}
	return total
}

const addNums2 = add2(1, 2, 3, 4)
console.log(addNums2)


// example with default parameter
function divide(dividend, divisor=1) {
	const quotient = dividend / divisor
	return quotient
}

const quotient = divide(42, 2)
console.log(`calling the divide function with '2' paramters: ${quotient}`)

const quotient2 = divide(42)
console.log(`calling divide function with '1' parameter: ${quotient2}`)

// function expression using the `function` keyword
const remainder = function(dividend, divisor) {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}

const rem = remainder(8, 5)
console.log(`remainder: ${rem}`)

// function expression using arrow syntax (preferred)
const remainder2 = (dividend, divisor) => {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}

console.log(remainder2(13, 4))

// function expression using arrow syntax and one parameter
const sqr = num => num * num
console.log(sqr(4))
