'use strict'

const request = require('request')
const googleapikey = require('../secrets').googleapi.key

exports.doBookSearch = function doBookSearch (req, res, next) {

  const q = req.query.q  // get the search term from the URL querystring

  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleapikey}`

  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const books = []
      const results = JSON.parse(body).items
      for (let i = 0; i < results.length; i++) {
        let book = {
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

