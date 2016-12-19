'use strict'

const check = require('../modules/authorize')
const errorResponse = require('../modules/utils').errorResponse

module.exports = async function(req, res, next) {
    const auth = req.authorization
    try {
        await check(auth)
        return next()
    } catch (err) {
        return errorResponse(err, res)
    }
}
