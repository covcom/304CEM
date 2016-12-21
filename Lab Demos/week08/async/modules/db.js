'use strict'

const storage = require('node-persist')
const errors = require('./errors')

async function connect(dbName) {
    this.db = storage.create({dir: `./.node_persist/${dbName}`})
    try {
        await this.db.init()
    } catch (err) {
        console.error(err)
        throw new errors.ConnectionError()
    }
    return this
}

async function get(key) {
    const value = await this.db.getItem(key)
    if (!value) throw new errors.NotFoundError()
    return value
}

async function add(key, value) {
    const exists = await this.db.getItem(key)
    if (!!exists) throw new errors.ItemExistsError()
    return await this.db.setItem(key, value)
}

async function update(key, value) {
    const exists = await this.db.getItem(key)
    if (!exists) throw new errors.NotFoundError()
    return await this.db.setItem(key, value)
}

async function delete_(key) {
    const exists = await this.db.getItem(key)
    if (!exists) throw new errors.NotFoundError()
    return await this.db.removeItem(key)
}

async function list() {
    return await this.db.values()
}

async function clear() {
    return await this.db.clear()
}

/* Make the async operations available to other modules */
module.exports = {
    connect: connect,
    add: add,
    get: get,
    update: update,
    delete: delete_,
    list: list
}
