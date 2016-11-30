// file to handle checking a request object for basic authorisation
// only call next() to authorise this request if there is no error from the check

'use strict'

const authorize = require('./authorize')

exports.authorize = (req, res, next) => {
	const auth = req.authorization
	authorize.check(auth, (err, ok) => {
		if (err) return res.send(401, err)
		return next()
	})
}

