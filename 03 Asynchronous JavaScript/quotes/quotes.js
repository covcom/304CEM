
'use strict'

/**
 * quotes module.
 * @module quotes
 */

/**
 * Callback used by apiCall
 * @callback apiCallback
 * @param {error} err - error returned (null if no error)
 * @param {data} data - the data returned as an object
 */

const request = require('request')
const cheerio = require('cheerio')

/**
 * returns the quotes attributed to the specified author
 * @param {string} author - the name of the author to search for
 * @param {apiCallback} callback - the callback run when api call is completed
 * @returns {null} no return value
 */
exports.getQuotes = (author, callback) => {
	const page = 1
	scraper(author, page, (err, data) => {
		if (err) return callback(err)
		return callback(null, data)
	})
}

/**
 * handles the screen-scraping and extracts data from the html page
 * @function scraper
 * @param {string} author - the name of the author to search for
 * @param {string} page - the page number of results to retrieve
 * @param {apiCallback} callback - the callback run when api call is completed
 * @returns {null} no return value
 */
function scraper(author, page, callback) {
	const pageCount = 10
	const firstIndex = 0
	const url = `http://www.quotationspage.com/search.php3?startsearch=Search&homesearch=${author}&page=${page}`
	console.log(url)
	request.get(url, (err, res, body) => {
		if (err) return callback(new Error('page access error'))
		const $ = cheerio.load(body, {decodeEntities: false})
		if ($('p:contains("No quotations found")').length) return callback(new Error('invalid name'))
		const data = {}
		data.count = $('small').text().match(/\d+/g).pop()
		data.pages = Math.ceil(data.count / pageCount)
		data.quotes = []
		$('dt.quote > a').each(function(i, element) {
			data.quotes.push(element.children[firstIndex].data)
		})
		return callback(null, data)
	})
}
