
'use strict'

const Book = require('./bookSchema')

exports.saveBook = bookDetails => new Promise( (resolve, reject) => {
	if ('title' in bookDetails && 'authors' in bookDetails && 'description' in bookDetails) {
		console.log('saving the book')
		const book = new Book(bookDetails)

		book.save( (err, book) => {
			console.log('attempt made')
			if (err) {
				reject('an error saving book')
			}
			console.log('book saved')
			resolve(book)
		})
	}
	reject('invalid book object')
})
