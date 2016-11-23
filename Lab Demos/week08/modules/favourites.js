
const storage = require('node-persist')  // use basic file-based data persistence

exports.list = function list (req, res) {
  dbConnect(req, res, userstore => res.send({favourites: userstore.values()}))
}

exports.add = function add (req, res) {
  // assume request body has been validated already: this just saves the book
  dbConnect(req, res, userstore => {
    const book = req.body
    userstore.setItem(book.id, book, err => {
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
}

exports.update = function update (req, res, next) {
  // use the ID in the URL to ensure the fav exists, then overwrite it
}

exports.delete = function delete_ (req, res, next) {
  // use the ID in the URL to remove a specific fav, silently fail if it doesn't exist
}

function dbConnect (req, res, callback) {

  // define the storage file for this user
  const username = req.authorization.basic.username
  const userstore = storage.create({dir: `./.node-persist/favourites/${username}`})
  
  // initialise the connection (creates a new file if necessary)
  userstore.init(err => {

    if (err) {
      console.log(err)
      return res.send(500, {message: 'Unable to initialise data store'})
    } else {
      return callback(userstore)  // can now read and write to the storage file
    }

  })
}
