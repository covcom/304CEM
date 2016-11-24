
'use strict'

// file to manage the actual connections to the database

const storage = require('node-persist')

exports.usersConnection = function usersConnection(res, callback) {

	// define the storage file for the list of users
	const usersDB = storage.create({dir: `./.node-persist/users`})

	// initialise the connection (creates a new file if necessary)
	usersDB.init(err => {

		if (err) {
			console.log(err)
			return res.send(500, {message: 'Unable to initialise data store'})
		} else {
			return callback(usersDB)  // can now read and write to the storage file
		}

	})
}

exports.favouritesConnection = function favouritesConnection(req, res, callback) {

	// define the storage file for this user
	const username = req.authorization.basic.username
	const favourites = storage.create({dir: `./.node-persist/favourites/${username}`})

	// initialise the connection (creates a new file if necessary)
	favourites.init(err => {

		if (err) {
			console.log(err)
			return res.send(500, {message: 'Unable to initialise data store'})
		} else {
			return callback(favourites)  // can now read and write to the storage file
		}

	})
}
