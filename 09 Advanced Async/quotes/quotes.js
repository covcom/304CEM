
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

const request = require('request-promise')
const cheerio = require('cheerio')

/**
 * returns the quotes attributed to the specified author
 * @param {string} author - the name of the author to search for
 * @param {apiCallback} callback - the callback run when api call is completed
 * @returns {null} no return value
 */
exports.getQuotes2 = (author, callback) => {
	const page = 1
	scraper(author, page).then( (data) => {
		callback(null, data)
	}).catch( (err) => {
		callback(err)
	})
}

exports.getQuotes = function(author) {
	const page = 1
	return new Promise((resolve, reject) => {
		scraper(author, page).then((data) => {
			resolve(data)
		}).catch( err => {
			reject(err)
		})
	})
}

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
			throw err
		})
	})
}
