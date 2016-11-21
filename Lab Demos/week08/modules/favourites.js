
const storage = require('node-persist')

exports.list = function list (req, res, next) {
  const userstore = storage.create({dir: `./node-persist/${username}`})
  userstore.init(err => {
    if (err) throw new Error('Unable to initialise data store')
    res.send(userstore.values())
  })
}

exports.add = function add (req, res, next) {
  const userstore = storage.create({dir: `./node-persist/${username}`})
  const book = JSON.parse(req.body)
  userstore.init(err => {
    if (err) throw new Error('Unable to initialise data store')
    userstore.setItem(book.id, book, err => {
      if (err) throw new Error(`Could not save book ${book}`)
      res.send(book)
    })
  })
}

exports.get = function get (req, res, next) {
  
}

exports.update = function update (req, res, next) {
  
}

exports.delete = function delete_ (req, res, next) {
  
}