
'use strict'

const google = require('./modules/google')
//const persistence = require('./modules/persistence')

exports.search = (request, callback) => {
	this.extractParam(request, 'q').then( query => {
		console.log(query)
		return google.searchByString(query)
	}).then( data => {
		console.log('tidying up array')
		console.log(data)
		return this.cleanArray(request, data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		console.log('ERROR')
		console.log(err)
		callback(err)
  })
}

exports.extractParam = (request, param) => new Promise( (resolve, reject) => {
	console.log(request.param)
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host || 'http://localhost'
	console.log(data)
	const clean = data.items.map(element => {
		return {
			title: element.volumeInfo.title,
			link: `${host}/books/${element.id}`
		}
	})
	resolve({books: clean})
})