
'use strict'

// import the mongoose package
const mongoose = require('mongoose')
const db = {
	user: 'testuser',
	pass: 'password'
}

mongoose.connect(`mongodb://${db.user}:${db.pass}@ds147497.mlab.com:47497/bookshop`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
	name: String,
	username: String,
	password: String
})

// create a model using the schema
exports.User = mongoose.model('User', userSchema)

// create a schema
const bookSchema = new Schema({
	account: String,
	title: String,
	authors: String,
	description: String,
	bookID: String
})

// create a model using the schema
exports.Book = mongoose.model('Book', bookSchema)
