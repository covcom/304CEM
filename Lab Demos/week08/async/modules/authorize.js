'use strict'

const db = require('./db')
const errors = require('./errors')

module.exports = async function(auth) {

    if (!auth || !auth.basic) throw new errors.AuthorizationError()
    
    const username = auth.basic.username
    const password = auth.basic.password

    const users = await db.connect('users')
    const user = await users.get(username)

    if (user.password !== password || user.confirmed !== true) throw new errors.AuthorizationError()

    // no errors thrown implies the check succeeded 
}
