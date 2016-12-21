// file to store, confirm and delete users that will be authorized to manage favourites

'use strict'

const uuid = require('uuid')
const errors = require('./errors')
const favourites = require('./favourites')

const db = require('./db')

function validate(user) {
    const data = user => !!user
    const username = user => !!user.username
    const email = user => !!user.email && user.email.length >= 5 && user.email.indexOf('@') >= 1
    const password = user => !!user.password && user.password.length >= 6

    const checks = [data, username, email, password]
    const passes = check => check(user)

    if (checks.every(passes)) {
        return true
    } else {
        throw new errors.ValidationError()
    }
}

async function add(user) {
    const users = await db.connect('users')
    user.confirmed = false
    user.code = uuid()
    await users.add(user.username, user)
    console.log(user.username, user.code)
}

async function confirm(username, code) {
    const users = await db.connect('users')
    const user = await users.get(username)

    if (user.code === code) {
        user.confirmed = true
        return await users.update(username, user)
    } else {
        throw new errors.ConfirmationError()
    }
}

async function delete_(user) {
    const users = await db.connect('users')
    await users.delete(user)
    await favourites.clear(user)  // can only happen if user was deleted
}

module.exports = {
    validate: validate,
    add: add,
    confirm: confirm,
    delete: delete_
}