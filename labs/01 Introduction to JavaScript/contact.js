
/* This script demonstrates how JavaScript can be used to handle exceptions. */

const readline = require('readline-sync')

try {
	const email = String(readline.question('enter email address: '))
	console.log('email is a '+typeof email+' and contains '+email)
	if (!email || email.length < 6 || email.indexOf('@') === -1) {
		throw 'invalid email address'
	}
	
	const score = Number(readline.question('assign score 1-10: '))
	console.log('score is a '+typeof score+' and contains '+score)
	if (Number.isNaN(score) || score % 1 !== 0 || score < 1 || score > 10) {
		throw 'invalid score'
	}
	
	const comment = String(readline.question('enter your comment : '))
	if (comment.length === 0) {
		throw 'mmissing comment'
	}
	console.log('all input is valid')
} catch(err) {
	console.log(err)
} finally {
	console.log('the script has finished')
}
