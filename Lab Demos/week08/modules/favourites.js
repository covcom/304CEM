'use strict'

const storage = require('node-persist')  // use basic file-based data persistence
const favouritesConnection = require('./db').favouritesConnection

exports.validate = function validate (req, res, next) {
  const fav = JSON.parse(req.body)
  if (!fav) res.send(400, {message: 'Need to send some data'})
  if (!fav.id || !fav.title || !fav.authors || !fav.description) res.send(400, {message: 'ID, title, authors, description: REQUIRED'})
  if (fav.review && typeof fav.review !== 'string') res.send(400, {message: 'Review must be a string'})
  if (fav.stars && fav.stars < 0) res.send(400, {message: 'Stars must be over 0'})
  next()
}

exports.list = function list (req, res) {
  favouritesConnection(req, res, favourites => res.send({favourites: favourites.values()}))
}

exports.add = function add (req, res) {

  // connect to the favourites DB then save the given book
  favouritesConnection(req, res, favourites => {
    const book = req.body
    favourites.setItem(book.id, book, err => {
      if (err) {
        console.log(err)
        return res.send(500, {message: 'Could not save book', book: book})
      } else {
        return res.send(201, {message: 'Saved book', book: book})
      }
    })
  })
}

exports.get = function get (req, res, next) {
  // use the ID in the URL to look up a particular favourite
  const bookid = req.params.id

  // connect to the favourites DB then get the requested book
  favouritesConnection(req, res, favourites => {
    favourites.getItem(bookid, (err, book) => {
      if (err) return res.send(500, {message: 'Could not get requested favourite.'})
      res.send({book: book})
    })
  })
}

exports.update = function update (req, res, next) {
  // use the ID in the URL to ensure the fav exists, then overwrite it
}

exports.delete = function delete_ (req, res, next) {
  // use the ID in the URL to remove a specific fav, silently fail if it doesn't exist
}
