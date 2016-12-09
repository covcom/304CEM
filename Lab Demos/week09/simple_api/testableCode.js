
'use strict'

var storage = require('node-persist')

storage.initSync()

// can write 2 tests
exports.checkData = function(data) {
	if (data.id === undefined) return false
	return true
}

// 2 tests
exports.addData = function(data) {
	if (storage.getItemSync(data.id) !== undefined) {
		return false
	}
	storage.setItemSync(data.id, data)
	return true
}

// 2 tests
exports.updateData = function(data) {
	if (storage.getItemSync(data.id) === undefined) {
		return false
	}
	storage.setItemSync(data.id, data)
	return true
}

// 2 tests
exports.countItems = function() {
	const favourites = storage.values()
	if (favourites.length) return true
	return false
}