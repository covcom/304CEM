
'use strict'

const employee = {
    firstName: 'Colin',
    'last name': 'Stephen',
    'department': 'Computing'
}

console.log(employee)
console.log(JSON.stringify(employee, null, 4))

console.log(`${employee.firstName} ${employee['last name']}`)
console.log(employee.department)

employee.department = 'Computer Science'
console.log(employee.department)

employee.grade = 4
console.log(employee)

delete employee.department
console.log(employee)

/*
simple objects example.
Used for 

needs to cover:
valid and invalid property names
using object literals
different property name syntaxes
setting new values

Needs to cover:
- name/value pairs
- valid and invalid property names
- creating object literals
- retrieving object values
- setting values by assignment
- overwriting values
- removing names

*/
