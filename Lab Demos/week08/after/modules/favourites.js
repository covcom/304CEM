// file to do CRUD operations of users' favourites (saving, updating, etc.)

'use strict'

const dbConnection = require('./db').dbConnection

exports.validate = (fav, callback) => {

    // check that fav matches our criteria

    if (!fav) return callback({message: 'Need to send some data'})
    if (!fav.id || !fav.title || !fav.authors || !fav.description) return callback({message: 'ID, title, authors, description: REQUIRED'})
    if (fav.review && typeof fav.review !== 'string') return callback({message: 'Review must be a string'})
    if (fav.stars && fav.stars < 0) return callback({message: 'Stars must be over 0'})

    // all the checks passed!
    return callback(null, true)

}


exports.list = (username, callback) => {

    // connect to db and return all of its values

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        return callback(null, db.values())
    })

}


exports.add = (username, book, callback) => {

    // connect to db and save new book, unless ID is already taken

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        
        if (db.getItemSync(book.id)) return callback({message: 'id already exists', id: book.id})

        db.setItem(book.id, book, err => {
            if (err) {
                return callback({message: 'Could not save book', book: book})
            } else {
                return callback(null, {message: 'Saved book', book: book})
            }
        })

    })
}

exports.get = (username, bookid, callback) => {

    // connect to db and look up the book by ID

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        
        db.getItem(bookid, (err, book) => {
            if (err) {
                return callback({message: 'Could not access list of books'})
            } else if (!book) {
                return callback({message: 'Book not found', id: bookid})
            } else {
                return callback(null, {message: 'Book found', book: book})
            }
        })

    })
}
