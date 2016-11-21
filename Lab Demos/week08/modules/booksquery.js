'use strict'

const request = require('request')
const googleapikey = require('../secrets').googleapi.key

exports.doBookSearch = function doBookSearch (req, res, next) {
  const q = req.query.q
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleapikey}`
  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const books = []
      for (let i = 0; i < 5; i++) {
        let book = {
          title: JSON.parse(body).items[i].volumeInfo.title,
          authors: JSON.parse(body).items[i].volumeInfo.authors,
          description: JSON.parse(body).items[i].volumeInfo.description
        }
        books.push(book)
      }
      res.send(books)
    }
  })
}
