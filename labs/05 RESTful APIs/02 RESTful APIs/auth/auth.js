
var bcrypt = require('bcrypt')
var storage = require('node-persist')
storage.initSync()

exports.addAccount = (request, callback) => {
	console.log(request.authorization)
	if (request.authorization == undefined || request.authorization.scheme !== 'Basic') {
		callback(new Error('basic authorization header missing'))
	}
	const username = request.authorization.basic.username
	if (storage.getItemSync(username) !== undefined) {
		callback(new Error('account '+username+' already exists'))
	}
	const password = request.authorization.basic.password
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)
	const account = {username: username, hash: hash}
	storage.setItem(username, account)
	callback(null, {message: 'account created', username: username} )
}

exports.getAccount = (request, callback) => {
	console.log(request.authorization)
	if (request.authorization == undefined || request.authorization.scheme !== 'Basic') {
		callback(new Error('basic authorization header missing'))
	}
	const username = request.authorization.basic.username
	if (storage.getItemSync(username) === undefined) {
		callback(new Error('account '+username+' does not exist exists'))
	}
	var account = storage.getItemSync(username)
	const password = request.authorization.basic.password
	console.log(password+' : '+account.hash)
	if (!bcrypt.compareSync(password, account.hash)) {
		callback(new Error('invalid password'))
	}
	const data = {username: username}
	callback(null, data)
}
