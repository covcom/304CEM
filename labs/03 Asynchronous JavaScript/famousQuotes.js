"use strict"

const readline = require('readline-sync')
const request = require('request')
const cheerio = require('cheerio')

const author = String(readline.question('author name: ')).trim()

var page = 1
const url = 'http://www.quotationspage.com/search.php3?startsearch=Search&homesearch='+author+'&page='+page
console.log(url)

request(url, function(err, res, body) {
	try {
		const $ = cheerio.load(body)
		$('dt.quote > a').each(function(i, element) {
			console.log(element.children[0].data)
		})
	} catch(err) {
		
	}
})

// http://www.smashingmagazine.com/2015/04/web-scraping-with-nodejs/