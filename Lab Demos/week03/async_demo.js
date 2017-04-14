
'use strict'

const asyncFunc = function(name, callback) {
	const names = ['colin', 'bob']
	if (names.indexOf(name) > -1) {
		// success
		const result = 'found'
		return callback(null, result)
	} else {
		// error
		const message = 'name not found'
		return callback(message)
	}
}

// check username exists
const check = function(name) {
	asyncFunc(name, function(err, result) {
		if (err) {
			// it didn't work i.e. not found
			console.error(err)
			throw new Error("broke looking for name")
		} else {
			// success: i.e. result has a value
			console.log("It was found.")
			console.log(result)
		}
	})
}

check('colin')
check('nobody')

// function(err, data) {} is common callback signature
