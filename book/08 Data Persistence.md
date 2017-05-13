
# Data Persistence

Data from other APIs / Screen scraping read only

Need to add value to this

Demonstrate CRUD

So need to store data

Script restart needed if code changes

Filesystem

Relational database

Document database

Graph database

## Filesystem

Stores text in file against key

Formatted as JSON data

Easy to store and retrieve by key

Simple to implement

Difficult to query
```javascript
const storage = require('node-persist')
storage.initSync()

exports.addBook = function(isbn, callback) {
	const data = {
		title: 'The Hobbit',
		authors: 'J.R.R. Tolkien',
		description: 'Hobbit finds ring...'
	}
	storage.setItemSync(isbn, data)
}
```

## Relational Database

Familiar data storage

Supports complex queries

Difficult to scale

Data needs normalising
```javascript
const mysql = require('mysql')
const request = require('request')

const connection = mysql.createConnection({ host: 'xxx', port: '3306', user: 'xxx', password: 'xxx', database: 'xxx' })

const sql = 'INSERT INTO books (id, title, authors, description) VALUES (NULL, "The Hobbit, "J.R.R. Tolkien", "Ring found")'

connection.query(sql, (err, rows) => {
	if (err) callback( Error(`database error: ${err}`) )
	return callback(null, rows)
})
```

## Document Database

Stores JavaScript objects

Can be queried using JavaScript

Mongoose Example.

Start by defining a _schema file_:
```javascript
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const bookSchema = new Schema({
	title: String,
	authors: String,
	description: String
})
const Book = mongoose.model('Book', bookSchema)
module.exports = Book
```
Storing a document.
```javascript
const book = new Book({
	title: data.title,
authors: data.authors,
	description: data.description
})

book.save( function(err, book) {
if (err) {
		callback( Error(`database error: ${err}`) )
	}
	return callback(null, book)
})
```

## Document Databases

Good for modelling relationships

## Choosing a Database

Factors:

- Type of data to be stored
- How this will be retrieved
- Complexity

Online Hosting

- Relational		MySQL			freemysqlhosting.net
- Document		MongoDB		mlab.com
- Graph			Neo4J			graphenedb.com

