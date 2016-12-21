
/* Custom errors to throw from api modules */

'use strict'

function error(name, default_message) {
	function ErrorConstructor(message) {
		this.name = name
		this.message = message || default_message
		this.stack = (new Error()).stack
	}
	ErrorConstructor.prototype = Object.create(Error.prototype)
	ErrorConstructor.prototype.constructor = ErrorConstructor
	return ErrorConstructor
}

module.exports = {
	ItemExistsError: error('ItemExistsError', 'item exists already'),
	NotFoundError: error('NotFoundError', 'item not found'),
	ValidationError: error('ValidationError', 'invalid data'),
	ConnectionError: error('ConnectionError', 'could not connect'),
	ConfirmationError: error('ConfirmationError', 'confirmation code does not match'),
	AuthorizationError: error('AuthorizationError', 'unauthorized'),
	GatewayError: error('GatewayError', 'received an unexpected response')
}
