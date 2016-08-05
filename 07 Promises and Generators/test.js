'use strict'

const request = require('request-promise')
const cheerio = require('cheerio')

/**
 * handles the screen-scraping and extracts data from the html page
 * @function scraper
 * @param {string} author - the name of the author to search for
 * @param {string} page - the page number of results to retrieve
 * @returns {null} no return value
 */
function scraper(author, page) {
	const pageCount = 10
	const firstIndex = 0
	const url = `http://www.quotationspage.com/search.php3?startsearch=Search&homesearch=${author}&page=${page}`
	console.log(url)
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

const promises = []

//countQuotes('twain').then( count => {
//	console.log(`COUNT: ${count}`)

//})

for (let i = 1; i < 3; i++) {
	promises.push(scraper('twain', i))
}

Promise.all(promises).then(function(allResponses) {
	let quotes = []
	for (const page of allResponses) {
		quotes = quotes.concat(page.quotes)
	}
	console.log(quotes)
})

