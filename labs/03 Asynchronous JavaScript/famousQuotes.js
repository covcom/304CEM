"use strict"

const readline = require('readline-sync')
const request = require('request')
const cheerio = require('cheerio')

const author = String(readline.question('author name: ')).trim()

const url = 'http://www.quotationspage.com/search.php3?startsearch=Search&homesearch='+author+'&page='+1
console.log(url)

request(url, function(err, res, body) {
	try {
		const $ = cheerio.load(body, {decodeEntities: false})
		const quoteCount = $('small').text().match(/\d+/g).pop()
		console.log('number of quotes: '+quoteCount)
		const pages = Math.ceil(quoteCount / 10)
		console.log('there are '+pages+' pages of quotes')
		$('dt.quote > a').each(function(i, element) {
			console.log(element.children[0].data)
		})
	} catch(err) {
		
	}
})
