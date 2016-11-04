
'use strict'

/* the HTTP response codes used by the API */
exports.status = {
	ok: 200,										// the request has succeeded
	created: 201,								// a new resource has been created
	badRequest: 400,						// request not understood due to malformed syntax
	unauthorized: 401,					// request requires valid authentication
	notFound: 404,							// no resource found matching the url
	methodNotAllowed: 405,			// the method specified is not allowed on the resource
	notAcceptable: 406,					// not able to supply the required respresentation
	unsupportedMediaType: 415		// the request body format is not valid
}

/* the MIME types supported by the API */
exports.format = {
	json: 'application/json',
	xml: 'application/xml'
}

/* the default indentation to use when rendering JSON strings */
exports.indent = 2
