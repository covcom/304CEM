'use strict'

const fetch = require('node-fetch')
const errors = require('./errors')

module.exports = async function(q) {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`
    let result = null
    
    try {
        result = await fetch(url)
    } catch (err) {
        console.error(err)
        throw new errors.ConnectionError()
    }

    if (result.status !== 200) {
        console.error(result)
        throw new errors.GatewayError()
    }

    const json = await result.json()
    const items = json.items
    const details = item => {
        return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description
        }
    }
    return items.map(details)
}
