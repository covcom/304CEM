
'use strict'

const request = require('request')

const storage = require('node-persist')
storage.initSync()

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
		storage.setItemSync(isbn, data)
	})
}
