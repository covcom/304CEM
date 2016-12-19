'use strict'

const users = require('../modules/users')
const errorResponse = require('../modules/utils').errorResponse

async function validate(req, res, next) {
	try {
		await users.validate(req.body)
	} catch (err) {
		return errorResponse(err, res)
	}
	return next()
}

async function add(req, res, next) {
	const user = req.body
	try {
		await users.add(user)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(201, 'added')
}

async function confirm(req, res, next) {
	const user = req.params.username
	const code = req.params.confirmation_code
	try {
		await users.confirm(user, code)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(200, 'confirmed')
}

async function update(req, res, next) {
	const user = req.body
	try {
		await users.update(user)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(200, 'updated')
}

async function delete_(req, res, next) {
	const user = req.authorization.basic.username
	try {
		await users.delete(user)
	} catch (err) {
		return errorResponse(err, res)
	}
	return res.send(204)
}


module.exports = {
	validate: validate,
	add: add,
	confirm: confirm,
	update: update,
	delete: delete_
}