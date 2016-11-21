
'use strict'

const arr = ['Steve', 'Alex', 'Dan', 'Alice', 'Bob']

arr.forEach( (element, index) => console.log(`${index}: ${element}`))

for(let i=0; i< arr.length; i++) {
	console.log(arr[i])
}

const newArray = []

for(let i=0; i< arr.length; i++) {
	if (arr[i].charAt(0) === 'A') {
		newArray.push(arr[i])
	}
}

console.log(newArray)

console.log(arr.filter( name => name.charAt(0) === 'A'))

//const print = item => console.log(item)

//arr.forEach( item => print(item) )