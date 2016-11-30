// file to make a call to the Google books API and callback with the results

'use strict'

const request = require('request')
const googleapikey = require('../secrets').googleapi.key

exports.doBookSearch = (q, callback) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleapikey}`

    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const books = []
            const results = JSON.parse(body).items

            for (let i = 0; i < results.length; i++) {
                const book = {
                    id: results[i].id,
                    title: results[i].volumeInfo.title,
                    authors: results[i].volumeInfo.authors,
                    description: results[i].volumeInfo.description
                }

                books.push(book)
            }
            return callback(null, books)
        } else {
            return callback({message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
        }
    })

}
