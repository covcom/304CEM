
"use strict"

const readline = require('readline-sync')

const first = String(readline.question('enter your firstname: ')).trim()
const last = String(readline.question('enter your last name: ')).trim()
const dept = String(readline.question('enter your department: ')).trim()

var employee = {
	firstname: first,
	lastname: last,
	department: dept,
	hiredate: new Date()
}

console.log(employee)
let pretty = JSON.stringify(employee, null, 2)
console.log(pretty)
