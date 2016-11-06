
'use strict'

// import the mongoose package
const mongoose = require('mongoose')
mongoose.connect('mongodb://user:pass@host:port/db')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a schema
const bookSchema = new Schema({
	title: String,
	authors: String,
	description: String
})

// create a model using the schema
const Book = mongoose.model('Book', bookSchema)

// export this so it can be used in our application
module.exports = Book
