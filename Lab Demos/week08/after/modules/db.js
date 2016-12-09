// file to manage the actual connections to the database

'use strict'

let storage = require('node-persist')

exports.dbConnection = function dbConnection(dbName, callback) {

	// use node-persist to connect to a "database" given by `dbName`

	const db = storage.create({dir: `./node-persist/${dbName}`})

	db.init(err => {

		if (err) {
			return callback({message: 'Unable to initialise data store'})
		} else {
			return callback(null, db)  // can now read and write to the storage file
		}

	})
}
