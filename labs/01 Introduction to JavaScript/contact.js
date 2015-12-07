
const readline = require('readline-sync')

const email = String(readline.question('enter email address: '))
const score = Number(readline.question('assign score 1-10: '))
const comment = String(readline.question('enter your comment : '))

console.log('email is a '+typeof email+' and contains '+email)
console.log('score is a '+typeof score+' and contains '+score)

try {
	if (!email || email.length < 6 || email.indexOf('@') === -1) {
		throw 'invalid email address'
	}
	if (Number.isNaN(score) || score % 1 !== 0 || score < 1 || score > 10) {
		throw 'invalid score'
	}
	if (comment.length === 0) {
		throw 'mmissing comment'
	}
} catch(err) {
	console.log(err)
}
