
'use strict'

exports.check = function(name, callback) {
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
