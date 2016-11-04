
'use strict'

const mysql = require('mysql')
const request = require('request')

const connection = mysql.createConnection({
	host: 'sql8.freemysqlhosting.net',
	port: '3306',
	user: 'xxx',
	password: 'xxx',
	database: 'xxx'
})

connection.connect()

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
		const sql = `INSERT INTO books (id, title, authors, description) VALUES (NULL, "${data.title}", "${data.authors}", "${data.description}")`
		console.log(sql)
		connection.query(sql, (err, rows) => {
			if (err) callback( Error(`database error: ${err}`) )
			return callback(null, rows)
		})
	})
}
