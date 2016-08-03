'use strict'

const Person = require('./person')
try {
	const person = new Person('Andy', 'Capp')
	console.log(person.name)
	person.lastName = 'Pandy'
	console.log(JSON.stringify(person, null, 2))

	const badPerson = new Person('anon')
} catch(err) {
	console.log(`ERROR: ${err}`)
}