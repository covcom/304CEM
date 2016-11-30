// file to handle requests to store, confirm and delete users that will be authorized to manage favourites

'use strict'

const users = require('./users')


exports.validateUser = function validateUserHandler(req, res, next) {
	// ensure new users include a username and password
	const data = req.body
	users.validateUser(data, (err, isValid) => {
		if (isValid) return next()
		return res.send(400, err)
	})
	next()
}


exports.validateCode = function validateCodeHandler(req, res, next) {
	// ensure confirmation code is passed in the body
	const data = req.body
	users.validateCode(data, (err, isValid) => {
		if (isValid) return next()
		return res.send(400, err)
	})
}


exports.add = function addHandler(req, res, next) {
	// body includes username and password details
	const user = req.body
	users.add(user, (err, result) => {
		if (err) return res.send(400, err)
		return res.send(result)
	})
}


exports.confirm = function confirmHandler(req, res, next) {

	// username came as part of the URL
	const username = req.params.username
	// confirmation code comes in the body
	const code = req.body.confirmation

	console.log('Received', username, code)

	users.confirm(username, code, (err, result) => {
		if (err) return res.send(400, err)
		return res.send(result)
	})

}
	
												
exports.delete = function deleteHandler (req, res, next) {

	// username came as part of the URL
	const username = req.params.username
	// username must match authorization username
	const authuser = req.authorization.basic.username

	if (username !== authuser) return res.send(400, {message: 'You can\'t delete other users!'})

	// if it matches then connect to the store and delete
	users.delete(username, (err, result) => {
		if (err) return res.send(500, err)
		return res.send(result)
	})
}
