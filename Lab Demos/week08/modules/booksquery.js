
const request = require('request')
const googleapikey = require('../secrets').googleapi.key

exports.doBookSearch = function doBookSearch (req, res, next) {
  const q = req.query.q
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleapikey}`
  res.send(url)
}