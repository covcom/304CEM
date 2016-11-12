'use strict'

const readline = require('readline-sync')
const request = require('request')
const cheerio = require('cheerio')

const author = String(readline.question('author name: ')).trim()

getQuotes(author, (err, data) => {
	try {
		if (err) throw err
		console.log(data)
	} catch(err) {
		console.log(`ERROR: ${err.message}`)
	}
})

console.log('EOF')

function getQuotes(author, callback) {
	const page = 1
	scraper(author, page, (err, data) => {
		if (err) return callback(err)
		return callback(null, data)
	})
}

function getPageCount(author) {
	const pageCount = 10
	return new Promise( (resolve, reject) => {
		const url = `http://www.quotationspage.com/search.php3?startsearch=Search&homesearch=${author}`
		request.get(url, (err, res, body) => {
			if (err) reject(new Error('page access error'))
			const $ = cheerio.load(body, {decodeEntities: false})
			if ($('p:contains("No quotations found")').length) reject(new Error('invalid name'))
			const quoteCount = $('small').text().match(/\d+/g).pop()
			const pages = Math.ceil(quoteCount / pageCount)
			resolve(pages)
		})
	})
}

function getQuotes(author, page) {
	return new Promise((resolve, reject) => {
		const url = `http://www.quotationspage.com/search.php3?startsearch=Search&homesearch=${author}&page=${page}`
		request.get(url, (err, res, body) => {
			if (err) reject(new Error('page access error'))
			const $ = cheerio.load(body, {decodeEntities: false})
			if ($('p:contains("No quotations found")').length) reject(new Error('invalid name'))
			const quotes = []
			$('dt.quote > a').each(function(i, element) {
				quotes.push(element.children[0].data)
			})
			resolve(quotes)
		})
	})
}
