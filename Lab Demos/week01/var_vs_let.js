
'use strict'
// we are going to 'break' a lot of linting rules here so lets disable them!
/* eslint-disable no-undef, no-unused-vars, no-var, prefer-const */

// difference between var and let

function myfun() {
	if (true) {
		let test = 5
		var test2 = 10
	}
	console.log(test2)  // works (in function scope)
	console.log(test)  // fails (out of block scope)
}

myfun()

