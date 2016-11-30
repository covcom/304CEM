
'use strict'

// this module demonstrates the use of callbacks and
// connecting to a MongoDB database,
// there is also an example of a synchronous function.

const schema = require('./schema')

exports.add = (data, callback) => {
	if (this.validateData(data) === false) return callback(new Error('invalid data'))
	const list = new schema.List(data)

	list.save( (err, list) => {
		if (err) {
			console.log(err)
			callback(err)
		}
		callback(null, data)
	})
}

// this exported function returns how many documents
// there are in the MongoDB database
exports.count = callback => {
	schema.List.count({}, (err, count) => {
		if (err) callback(err)
		callback(null, count)
	})
}


// this is a standard anonymous function,
// returns true or throws error.
exports.validateData = data => {
	if (!data.name || !data.list) return false
	if (typeof data.name !== 'string' || !Array.isArray(data.list)) return false
	if (data.list.length === 0) return false
	return true
}

// this is an anonymous function that returns a promise.
exports.remove = listName => new Promise( (resolve, reject) => {
	schema.List.find({name: listName}).remove( err => {
		if (err) return reject(err)
		resolve()
	})
})
