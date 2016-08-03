
'use strict'

const Person = require('./person')
const Employee = require('./employee')

const person = new Person('Andy', 'Capp')
console.log(person.name)

const worker = new Employee()
worker.firstName = 'John'
worker.lastName = 'Doe'

console.log(worker.name)

const salary = worker.calculateSalary()
console.log(salary)

const manager = new Employee(4)
manager.firstName = 'Jane'
manager.lastName = 'Smith'

console.log(manager.name)

console.log(manager.calculateSalary(6))

console.log(manager)
