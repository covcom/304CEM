// file to handle requests to do CRUD operations of users' favourites (saving, updating, etc.)

'use strict'

const favourites = require('./favourites')

exports.validate = (req, res, next) => {
	const fav = req.body
	favourites.validate(fav, (err, isValid) => {
		if (isValid) return next()
		return res.send(400, err)
	})
}

exports.list = (req, res) => {
	const username = req.authorization.basic.username
	favourites.list(username, (err, result) => {
		if (err) return res.send(400, err)
		return res.send({favourites: result})
	})
}


exports.add = (req, res) => {
	const username = req.authorization.basic.username
	const book = req.body
	favourites.add(username, book, (err, result) => {
		if (err) return res.send(400, err)
		return res.send(result)
	})
}


exports.get = (req, res) => {
	const username = req.authorization.basic.username
	const bookid = req.params.id

	favourites.get(username, bookid, (err, result) => {
		if (err) return res.send(400, err)
		return res.send(result)
	})
}


exports.update = function update (req, res, next) {
	// use the ID in the URL to ensure the fav exists, then overwrite it
	res.send(501, {message: 'TODO'})
}

exports.delete = function delete_ (req, res, next) {
	// use the ID in the URL to remove a specific fav, silently fail if it doesn't exist
	res.send(501, {message: 'TODO'})
}
