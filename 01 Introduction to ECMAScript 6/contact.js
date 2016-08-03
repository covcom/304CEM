'use strict'

/* This script demonstrates how JavaScript can be used to handle exceptions. */

const readline = require('readline-sync')

/* any code that could throw an exception needs to be wrapped in a try block. If any line of code in the try block throws an exception the program immediately jumps to the catch block, passing the Error object thrown. Regardless of whether an error was thrown or not, the code in the finally block is run. */
try {
	const email = String(readline.question('enter email address: '))
	console.log('email is a '+typeof email+' and contains '+email)
	validateEmail(email)
	const score = Number(readline.question('assign score 1-10: '))
	console.log('score is a '+typeof score+' and contains '+score)
	validateScore(score)
	const comment = String(readline.question('enter your comment : '))
	validateComment(comment)
	console.log(`Thank you ${email}. You gave us a rating of ${score}/10 with the comment "${comment}"`)
} catch(err) {
	console.log(`${err.name} thrown`)
	console.log(`The error message is: ${err.message}`)
	console.log(err.stack)
} finally {
	console.log('the script has finished')
}

/**
 * Checks to see if the supplied parameter is formatted as a valid email
 * address.
 * @param   {string} email - The email address to be checked.
 * @returns {bool}
 * @throws  {TypeError} if the parameter is not a valid email address.
 */
function validateEmail(email) {
	return true
}

/**
 * Checks to see if the supplied parameter is a valid integer in the range 1-10.
 * @param   {string} score - The user-specified score.
 * @returns {bool}
 * @throws  {TypeError} if the parameter is not a valid integer.
 * @throws  {RangeError} if the parameter is not in the range 1-10.
 */
function validateScore(score) {
	if (Number.isNaN(score) || score % 1 !== 0) {
		throw new TypeError('parameter is not a valid integer')
	}
	if (score < 1 || score > 10) {
		throw new RangeError('parameter should be in the range 1-10')
	}
	return true
}

/**
 * Checks to see if the supplied comment is 'valid'.
 * @param   {string} comment - The user-specified score.
 * @returns {bool}
 * @throws  {RangeError} if the comment is not long enough.
 */
function validateComment(comment) {
	if (comment.length <= 5) {
		throw new RangeError('comment should be at least 5 characters long')
	}
	return true
}