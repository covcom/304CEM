
'use strict'

const auth = require('./modules/authorisation')
const google = require('./modules/google')
const persistence = require('./modules/persistence')

// ------------------ ROUTE FUNCTIONS ------------------ 

exports.search = (request, callback) => {
	extractParam(request, 'q').then( query => {
		return google.searchByString(query)
	}).then( data => {
		return this.cleanArray(request, data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		callback(err)
	})
}

exports.addToCartOld = (request, callback) => {
	extractBodyKey(request, 'id').then( id => {
		return google.getByID(id)
	}).then( book => {
		return persistence.saveBook(book)
	}).catch( err => {
		callback(err)
	})
}

exports.addToCart = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'id')
	}).then( id => {
		this.id = id
		return google.getByID(id)
	}).then( (book) => {
		this.book = book
		return persistence.bookExists(this.username, this.id)
	}).then( book => {
		this.book.account = this.username
		return persistence.saveBook(this.book)
	}).then( book => {
		delete book.account
		callback(null, book)
	}).catch( err => {
		callback(err)
	})
}

exports.showCart = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.getBooksInCart(this.username)
	}).then( books => {
		return this.removeMongoFields(request, books)
	}).then( books => {
		callback(null, books)
	}).catch( err => {
		callback(err)
	})
}

exports.addUser = (request, callback) => {
	let data
	auth.getHeaderCredentials(request).then( credentials => {
		return auth.hashPassword(credentials)
	}).then( credentials => {
		data = credentials
		return persistence.accountExists(credentials)
	}).then( () => {
		return extractBodyKey(request, 'name')
	}).then( name => {
		data.name = name
		return persistence.addAccount(data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		callback(err)
	})
}

// ------------------ UTILITY FUNCTIONS ------------------

const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})

const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host || 'http://localhost'
	const clean = data.items.map(element => {
		return {
			title: element.volumeInfo.title,
			link: `${host}/books/${element.id}`
		}
	})

	resolve({books: clean})
})

exports.removeMongoFields = (request, data) => new Promise( (resolve, reject) => {
	const host = request.host || 'http://localhost'
	const clean = data.map(element => {
		return {
			title: element.title,
			link: `${host}/books/${element.bookID}`
		}
	})

	resolve({books: clean})
})
