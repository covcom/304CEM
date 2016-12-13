
'use strict'

const request = require('request')
var storage = require('node-persist')

storage.initSync()

const testableCode = require('./testableCode')

exports.validateFavourite = function validateFavourite(req, res, next) {
	if (testableCode.checkData(req.body)) next()
	res.send(400, 'book id missing')
	res.end()
}

exports.addFavourite = function addFavourite(req, res) {
	if (testableCode.addData(req.body)) {
		res.send(201, req.body)
		res.end()
	} else {
		res.send(400, 'item already in favourites')
		res.end()
	}
}

exports.updateFavourite = function updateFavourite(req, res) {
	if (testableCode.updateData(req.params.id)) {
		res.send(201, req.body)
		res.end()
	} else {
		res.send(400, 'favourite does not exist')
		res.end()
	}
}

exports.listFavourites = function listFavourites(req, res) {
	if (testableCode.countItems) {
		res.send(storage.values())
		res.end()
	} else {
		res.send(400, 'no favourites in list')
		res.end()
	}
}

// storage.setItemSync('name','yourname')
// console.log(storage.getItemSync('name'))
// storage.values()

exports.searchBooks = function doBookSearch(req, res, next) {
	const q = req.query.q  // get the search term from the URL querystring
	const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`

	request.get(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			const books = []
			const results = JSON.parse(body).items

			for (let i = 0; i < results.length; i++) {
				const book = {
					id: results[i].id,
					title: results[i].volumeInfo.title,
					authors: results[i].volumeInfo.authors,
					description: results[i].volumeInfo.description
				}

				books.push(book)
			}
			res.send({books: books})
		} else {
			res.send(501, {message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
		}
	})
}


// =============================================


