
'use strict'

const Employee = require('./employee')

try {
	const worker = new Employee('John', 'Doe')
	console.log(worker.name)

	const salary = worker.calculateSalary()
	console.log(salary)

	const manager = new Employee('Peter', 'Piper', 4)
	console.log(manager.name)
	console.log(manager.calculateSalary(6))
	console.log(manager)

} catch(err) {
	console.log(`ERROR: ${err}`)
}
