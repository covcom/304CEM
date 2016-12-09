// file to query the database to check that an auth object matches some user credentials

'use strict'

const dbConnection = require('./db').dbConnection

exports.check = (auth, callback) => {
    
    if (!auth || !auth.basic) return callback({message: 'Need basic authorization header'})

    const username = auth.basic.username
    const password = auth.basic.password

    dbConnection('users', (err, db) => {
        if (err) return callback({message: 'Problem checking your authorization credentials'})

        const users = db.values()

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password && users[i].confirmed === true) return callback(null, true)
        }
        
        return callback({message: 'Username or password incorrect, or registration not confirmed'})
    })

}