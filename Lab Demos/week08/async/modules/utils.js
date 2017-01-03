
'use strict'

exports.errorResponse = function errorResponse(err, res) {
	/* send the correct response for each custom error */
	switch (err.name) {
		case 'ValidationError':
		case 'ConfirmationError':
			return res.send(400, err.message)
		case 'AuthorizationError':
			return res.send(401, err.message)
		case 'NotFoundError':
			return res.send(404, err.message)
		case 'ItemExistsError':
			return res.send(409, err.message)
		case 'ConnectionError':
			return res.send(500, err.message)
		case 'GatewayError':
			return res.send(502, err.message)
		default:
			/* If it is any other error (not a custom one) then log it */
			console.error(err)
			return res.send(500, 'unhandled error')
	}
}
