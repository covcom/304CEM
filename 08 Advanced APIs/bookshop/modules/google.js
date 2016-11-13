
'use strict'

const request = require('request')

exports.searchByString = query => new Promise( (resolve, reject) => {
	const url = `https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q=${query}`

	request.get(url, (err, res, body) => {
		if (err) {
			reject(Error('failed to make API call'))
		}
		const data = JSON.parse(body)
		resolve(data)
	})
})

exports.getByISBN = isbn => new Promise( (resolve, reject) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			reject(Error('book not found'))
		}
		const data = {
			title: `${json.items[0].volumeInfo.title}: ${json.items[0].volumeInfo.subtitle}`,
			authors: json.items[0].volumeInfo.authors[0],
			description: json.items[0].volumeInfo.description
		}

		resolve(data)
	})
})

exports.getByID = id => new Promise( (resolve, reject) => {
	const url = `https://www.googleapis.com/books/v1/volumes/${id}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			reject(Error('book not found'))
		}
		const data = {
			title: `${json.volumeInfo.title}: ${json.volumeInfo.subtitle}`,
			authors: json.volumeInfo.authors[0],
			description: json.volumeInfo.description.replace(/<(.|\n)*?>/g, ''),
			bookID: id
		}

		resolve(data)
	})
})
