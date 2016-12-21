'use strict'

const db = require('./db')
const errors = require('./errors')

async function favourites(user) {
    /* Get a connection to the user's favourites */
    return await db.connect(`favourites/${user}`)
}

async function list(user) {
    const favs = await favourites(user)
    return await favs.list()
}

async function add(user, book) {
    const favs = await favourites(user)
    return await favs.add(book.id, book)
}

async function get(user, id) {
    const favs = await favourites(user)
    return await favs.get(id)
}

async function update(user, book) {
    const favs = await favourites(user)
    return await favs.update(book.id, book)
}

async function delete_(user, id) {
    const favs = await favourites(user)
    return await favs.delete(id)
}

/* DANGER */
async function clear(user) {
    const favs = await favourites(user)
    return await favs.clear()
}

function validate(fav) {

    const data = fav => !!fav
    const id = fav => !!fav.id
    const title = fav => !!fav.title && typeof fav.title === 'string'
    const description = fav => !!fav.description && typeof fav.description === 'string'
    const review = fav => !fav.review || typeof fav.review === 'string'
    const stars = fav => !fav.stars || ( typeof fav.stars === 'number' && fav.stars >= 0 && fav.stars <= 5 )

    const checks = [data, id, title, description, review, stars]
    const passes = check => check(fav)

    if (checks.every(passes)) {
        return true
    } else {
        throw new errors.ValidationError()
    }
}

module.exports = {
    validate: validate,
    list: list,
    add: add,
    get: get,
    update: update,
    delete: delete_
}