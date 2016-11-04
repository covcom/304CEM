
'use strict'

const request = require('request')
const Book = require('./bookSchema')

exports.addBook = function(isbn, callback) {
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
	request.get( url, (err, res, body) => {
		if (err) return callback(Error('could not complete request'))
		const json = JSON.parse(body)
		if (json.totalItems === 0) {
			console.log('no results')
			return callback(Error('book not found'))
		}
		const data = {
			title: `${json.items[0].volumeInfo.title}: ${json.items[0].volumeInfo.subtitle}`,
			authors: json.items[0].volumeInfo.authors[0],
			description: json.items[0].volumeInfo.description
		}

		console.log('define the book to save')
		const book = new Book({
			title: data.title,
			authors: data.authors,
			description: data.description
		})

		console.log('saving the book')
		book.save( function(err, book) {
			console.log('attempt made')
			if (err) {
				console.log('an error saving book')
				callback( Error(`database error: ${err}`) )
			}
			console.log('book saved')
			console.log(book)
			return callback(null, book)
		})
	})
}

exports.getAll = function() {
	console.log('retrieving all the books')
	Book.find({}, function(err, books) {
		if (err) {
			console.log('error getting books')
			throw err
		}
		// object of all the users
  	console.log(books)
	})
}
