
var request = require('request')

// https://www.googleapis.com/books/v1/volumes?q=swift&maxResults=40&fields=items(id,volumeInfo(title,authors))

exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
    callback({code:400, response:{status:'error', message:'missing query (q parameter)'}})
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {q: query, maxResults: 40, fields: 'items(id,volumeInfo(title,authors))'}
  request.get({url: url, qs: query_string}, function(err, res, body) {
    if (err) {
      callback({code:500, response:{status:'error', message:'search failed', data:err}})
    }
    console.log(typeof body)
    const json = JSON.parse(body)
    const items = json.items
    const books = items.map(function(element) {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    console.log(books)
    callback({code:200, response:{status:'success', message:books.length+' books found', data:books}})
  })
}
