'use strict'

const search = require('../modules/books')
const errorResponse = require('../modules/utils').errorResponse

exports.validate = function(req, res, next) {
    const q = req.query.q
    if (!!q && typeof q === 'string' && q.length > 0) return next()
    return res.send(400, 'invalid query')
}

exports.search = async function(req, res, next) {
	const q = req.query.q
    let result = null
    try {
        result = await search(q)
    } catch (err) {
        return errorResponse(err, res)
    }
    return res.send(200, result)
}

