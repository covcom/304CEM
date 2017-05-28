
'use strict'

const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing',
	employment: {
		department: 'Computing',
		startDate: '20120815'
	}
}

console.log(employee)
const firstName = employee.firstName
const lastName = employee['last name']
const dept = employee.employment.department
const grade = employee.employment.grade

console.log(`${firstName} ${lastName} in ${dept} is at grade ${grade}`)

console.log(employee.department)
employee.department = 'Computer Science'
console.log(employee.department)

employee.grade = 4
console.log(employee)
console.log(grade)

delete employee.department
console.log(employee)

// const nonExistentObject.postCode // throws "TypeError"
// const addressObject = employee.address  // returns undefined
// const postCode = employee.address.postCode // throws "TypeError"
const postCode = employee.address && employee.address.postCode
console.log(postCode)
