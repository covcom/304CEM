
'use strict'

// import the mongoose package
const mongoose = require('mongoose')
const db = {
	user: 'testuser',
	pass: 'password'
}

mongoose.connect(`mongodb://${db.user}:${db.pass}@ds143777.mlab.com:43777/marktyers`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a schema
const listSchema = new Schema({
	name: String,
	list: [{type: String}]
})

// create a model using the schema
exports.List = mongoose.model('List', listSchema)
