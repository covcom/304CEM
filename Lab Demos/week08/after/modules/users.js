// file to store, confirm and delete users that will be authorized to manage favourites

'use strict'

const uuid = require('uuid')
const dbConnection = require('./db').dbConnection

exports.validateUser = (data, callback) => {

    if (!data.username || !data.password) return callback({message: 'Must supply a username and password'})
    return callback(null, true)

}


exports.validateCode = (data, callback) => {

    if (!data.confirmation) return callback({message: 'Must supply a confirmation code'})
    return callback(null, true)

}


exports.add = function add(user, callback) {

    // connect to the db and add this user, as long as the username is not in use
    // generate a code to allow subsequent user account confirmation

    dbConnection('users', (err, db) => {

        if (err) return callback(err)
        
        // first check that the user does not already exist
        if (db.getItemSync(user.username)) return callback({message: 'Username taken.'})

        // create a code and save as a *pending* user
        user.code = uuid()
        user.confirmed = false
        db.setItemSync(user.username, user)

        // get the code to the user somehow
        console.log('You need this code to confirm registration:', user.code)  // or send an email...

        // NB: don't send the code in the response
        return callback(null, {message: 'User added, please confirm registration using code', username: user.username})

    })
}


exports.confirm = function confirm(username, code, callback) {

    // connect to the db and check the code matches for this user
    // if so set to confirmed so that they can be authorised in future requests

    dbConnection('users', (err, db) => {

        if (err) return callback(err)
        
        db.getItem(username, (err, user) => {

            if (err) callback({message: 'error looking up user'})

            if (user && user.code === code) {

                // we have a match
                user.confirmed = true

                db.setItem(username, user, err => {
                    if (err) return callback({message: 'error confirming user'})
                    return callback(null, {message: 'confirmed user'})
                })

            } else {

                return callback({message: 'user does not exist or code does not match'})

            }
        })
    })

}


exports.delete = function delete_(username, callback) {

    // connect to the db and delete the given user
    // tidy up by also deleting their favourites

    dbConnection('users', (err, db) => {

        db.removeItem(username, err => {
            if (err) return callback({message: 'Could not delete user.'})

            // successful: now delete all of the user's favourites

            dbConnection(`favourites/${username}`, (err, db) => {

                if (err) return callback({message: 'User deleted, but could not remove favourites'})

                try {
                    db.clearSync()
                } catch (err) {
                    return callback({message: 'User deleted, but could not remove favourites'})
                }

                return callback(null, {message: `User ${username} and all favourites deleted`}) 
            })

        })
    })

}