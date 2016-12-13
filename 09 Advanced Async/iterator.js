
'use strict'
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators

const makeIterator = array => {
	let nextIndex = 0

	return {
		next: () => {
			if (nextIndex < array.length) return {value: array[nextIndex++], done: false}
			return {done: true}
		}
	}
}

const it = makeIterator(['red', 'orange'])

console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().done)
