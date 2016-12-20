'use strict'

const favourites = require('../modules/favourites')
const errorResponse = require('../modules/utils').errorResponse

async function validate(req, res, next) {
	try {
		await favourites.validate(req.body)
	} catch (err) {
		return errorResponse(err, res)
	}
	return next()
}

async function add(req, res) {
	const user = req.authorization.basic.username
	const book = req.body
	try {
		await favourites.add(user, book)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(201, book)
}

async function list(req, res) {
	const user = req.authorization.basic.username
	let favs = null
	try {
		favs = await favourites.list(user)
	} catch (err) {
		return errorResponse(err, res)
	}

	return res.send(200, favs)
}

async function get(req, res) {
	const user = req.authorization.basic.username
	const id = req.params.id
	let book = null
	try {
		book = await favourites.get(user, id)
	} catch (err) {
		return errorResponse(err, res)
	}

	return res.send(200, book)
}

async function update(req, res) {
	const user = req.authorization.basic.username
	const book = req.body
	try {
		await favourites.update(user, book)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(201, book)
}

async function delete_(req, res) {
	const user = req.authorization.basic.username
	const id = req.params.id
	try {
		await favourites.delete(user, id)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(204)
}

module.exports = {
	validate: validate,
	add: add,
	list: list,
	get: get,
	update: update,
	delete: delete_
}