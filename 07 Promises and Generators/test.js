'use strict'

const request = require('request-promise')
const cheerio = require('cheerio')

/**
 * handles the screen-scraping and extracts data from the html page
 * @function scraper
 * @param {string} author - the name of the author to search for
 * @param {string} page - the page number of results to retrieve
 * @returns {promise} a pending promise
 */
function scraper(author, page) {
	const pageCount = 10
	const firstIndex = 0
	const url = `http://www.quotationspage.com/search.php3?startsearch=Search&homesearch=${author}&page=${page}`
	return new Promise( (resolve, reject) => {
		request.get(url).then( body => {
			const $ = cheerio.load(body, {decodeEntities: false})
			const error = $('p:contains("No quotations found")').length
			if (error) return reject('invalid name')
			const data = {}
			data.count = $('small').text().match(/\d+/g).pop()
			data.pages = Math.ceil(data.count / pageCount)
			data.quotes = []
			$('dt.quote > a').each(function(i, element) {
				data.quotes.push(element.children[firstIndex].data)
			})
			return resolve(data)
		}).catch( err => {
			reject(err)
		})
	})
}

/**
 * handles the screen-scraping and extracts data from the html page
 * @function countQuotes
 * @param {string} author - the name of the author to search for
 * @returns {promise} a pending promise
 */
function countQuotes(author) {
	const page1 = 1
	return new Promise( (resolve, reject) => {
		scraper(author, page1).then( data => {
			console.log(data.count)
			resolve(data.count)
		}).catch( err => {
			reject(err)
		})
	})
}

countQuotes('twain').then( count => {
	const quotesPerPage = 10
	const correction = 1
	console.log(`COUNT: ${count}`)
	const pages = Math.trunc(count / quotesPerPage) + correction
	console.log(`PAGES: ${pages}`)
	const promises = []
	for (let i = 1; i < pages; i++) {
		promises.push(scraper('twain', i))
	}
	Promise.all(promises).then(function(allResponses) {
		let quotes = []
		for (const page of allResponses) {
			quotes = quotes.concat(page.quotes)
		}
		console.log(quotes)
		return quotes
	}).then( quotes => {
		console.log(quotes)
		console.log(quotes.length)
	})
})
